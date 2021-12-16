const config = require("config");
const { ConnectionPool, Request } = require("mssql/tedious");
const { databaseTypes, baseConfig } = require("../../config/constants/db");
const { throwInternalError } = require("../../util/prepareError");
const { emitter, events } = require("./poolEmitter");

const getConfigs = () => {
    const poolsInfo = config.get("mssql-pools");
    if (!poolsInfo || !poolsInfo.databases.length || !poolsInfo.users.length) {
        throw new Error("mssql-pools config is empty");
    }

    const databaseConfigs = poolsInfo.databases;
    const userConfigs = poolsInfo.users;

    return { databaseConfigs, userConfigs };
};

const disconnectDatabase = async (database) => {
    const closingPools = [];
    for (const pool of Object.values(database.pools)) {
        closingPools.push(pool.close());
    }
    await Promise.all(closingPools);
};

const connectToDb = async (database) => {
    await disconnectDatabase(database);
    const connectedPools = [];
    for (const pool of Object.values(database.pools)) {
        connectedPools.push(pool.connect());
    }
    await Promise.all(connectedPools);
};

class PoolManager {
    constructor() {
        this.unavailableDatabases = [];
        this.availableDatabases = {
            master: null,
            slaves: [],
        };
        this.timer = 4000;
        this.slaveIndex = -1;
        this.masterRequests = 0;
    }

    insertUAD(database) {
        this.unavailableDatabases.push(database);
    }

    removeUAD(index) {
        this.unavailableDatabases.splice(index, 1);
    }

    insertAD(database, dbType) {
        if (dbType === databaseTypes.readWrite) {
            this.availableDatabases.master = database;
            return;
        }

        this.availableDatabases.slaves.push(database);
    }

    removeAD(index, dbType) {
        if (dbType === databaseTypes.readWrite) {
            this.availableDatabases.master = null;
            return;
        }

        this.availableDatabases.slaves.splice(index, 1);
    }

    swapUADtoAD(dbName, dbType) {
        const index = this.unavailableDatabases.findIndex((db) => db.name === dbName);
        if (index === -1) {
            return;
        }

        this.insertAD(this.unavailableDatabases[index], dbType);
        this.removeUAD(index);
    }

    swapADtoUAD(dbName, dbType) {
        let db = this.availableDatabases.master;
        let index = -1;
        if (dbType === databaseTypes.read) {
            index = this.availableDatabases.slaves.findIndex((db) => db.name === dbName);
            db = index !== -1 ? this.availableDatabases.slaves[index] : null;
        }

        if (!db) {
            return;
        }

        this.insertUAD(db);
        this.removeAD({ index }, dbType);
    }

    trySwapAnySlaveToMaster() {
        if (this.availableDatabases.slaves.length === 0) {
            return;
        }

        const db = this.availableDatabases.slaves[0];
        this.removeAD(0, databaseTypes.read);
        this.insertAD(db, databaseTypes.readWrite);

        emitter.emit(events.swapSlaveToMaster);
    }

    getNextSlave() {
        this.slaveIndex++;
        if (this.slaveIndex === this.availableDatabases.slaves.length) {
            this.slaveIndex = 0;
        }

        return this.availableDatabases.slaves[this.slaveIndex];
    }

    _isAllSlavesLost() {
        return this.availableDatabases.slaves.length === 0;
    }

    _isAllDbLost() {
        return this._isAllSlavesLost() && !this.availableDatabases.master;
    }

    onDbUnavailable(database, dbType) {
        this.swapADtoUAD(database.name, dbType);
        if (dbType === databaseTypes.readWrite) {
            this.trySwapAnySlaveToMaster();
        }

        this.resolveUAD(database);

        if (this.availableDatabases.slaves.length === 0 && !this.availableDatabases.master) {
            emitter.emit(events.allDbLost);
        }
        emitter.emit(events.dbUnavailable, { dbName: database.name, dbType });
    }

    onDbAvailable(dbName) {
        const dbType = this.availableDatabases.master ? databaseTypes.read : databaseTypes.readWrite;
        this.swapUADtoAD(dbName, dbType);

        emitter.emit(events.dbAvailable, { dbName, dbType });
    }

    async resolveUAD(database) {
        try {
            emitter.emit(events.tryingResolveUAD, { dbName: database.name });
            await connectToDb(database);

            this.onDbAvailable(database.name);
        } catch (e) {
            setTimeout(() => this.resolveUAD(database), this.timer);
        }
    }

    init() {
        const { databaseConfigs, userConfigs } = getConfigs();

        const generatePools = (databaseConfig) => {
            const pools = {};
            userConfigs.forEach((user) => {
                pools[user.role] = new ConnectionPool({
                    ...databaseConfig,
                    ...user.config,
                    ...baseConfig,
                });
            });
            return pools;
        };

        let databases = [];
        for (const databaseConfig of databaseConfigs) {
            databases.push({
                name: databaseConfig.server,
                pools: generatePools(databaseConfig),
            });
        }

        for (const database of databases) {
            this.insertUAD(database);
            this.resolveUAD(database);
        }
    }

    newRequest({ type, user, isPerformance }, preparing = null) {
        if (this.masterRequests > 20) {
            isPerformance = false;
        }

        if (this._isAllDbLost()) {
            throwInternalError();
        }

        let database;
        let dbType;
        if (type === databaseTypes.readWrite || isPerformance || this._isAllSlavesLost()) {
            database = this.availableDatabases.master;
            dbType = databaseTypes.readWrite;
        } else {
            database = this.getNextSlave();
            dbType = databaseTypes.read;
        }
        const pool = database.pools[user];

        const request = new Request(pool);
        if (typeof preparing === "function") {
            preparing(request);
            request.preparing = preparing;
        }

        request.options = { type, user, isPerformance };
        request.database = database;
        request.dbType = dbType;
        return request;
    }

    async executeRequest(command, request) {
        try {
            this.masterRequests++;
            return await request.execute(command);
        } catch (error) {
            if (error.name === "ConnectionError") {
                this.onDbUnavailable(request.database, request.dbType);
                return await this.handleBadRequest(command, request);
            }

            throwInternalError();
        } finally {
            this.masterRequests--;
        }
    }

    async handleBadRequest(command, request) {
        if (this._isAllDbLost()) {
            throwInternalError();
        }

        try {
            const newRequest = this.newRequest(request.options, request.preparing);
            return await this.executeRequest(command, newRequest);
        } catch (e) {
            return await this.handleBadRequest(command, request);
        }
    }
}

const poolManager = new PoolManager();

module.exports = poolManager;
