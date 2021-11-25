const config = require("config");
const { ConnectionPool, Request } = require("mssql/msnodesqlv8");
const { databaseTypes } = require("../../../config/constants/db");
const { throwInternalError } = require("../../util/prepareError");

const baseConfig = {
    connectionTimeout: 2000,
    requestTimeout: 2000,
};

const getConfigs = () => {
    const poolsInfo = config.get("mssql-pools");
    if (!poolsInfo || !poolsInfo.databases.length || !poolsInfo.users.length) {
        throw new Error("mssql-pools config is empty");
    }

    const databaseConfigs = poolsInfo.databases;
    const userConfigs = poolsInfo.users;

    return { databaseConfigs, userConfigs };
};

const connectToDb = async (database) => {
    const connectedPools = [];
    for (const pool of Object.values(database)) {
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
        this.timer = 15000;
        this.slaveIndex = -1;
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

    async disconnectDatabase(database) {
        const closingPools = database.pools.map((pool) => pool.close());
        await Promise.all(closingPools);
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
    }

    getNextSlave() {
        if (this.availableDatabases.slaves.length === 0) {
            return null;
        }

        this.slaveIndex++;
        if (this.slaveIndex === this.availableDatabases.slaves.length) {
            this.slaveIndex = 0;
        }

        return this.availableDatabases.slaves[this.slaveIndex];
    }

    async onDbUnavailable(database, dbType) {
        this.swapADtoUAD(database.name);
        await this.disconnectDatabase(database);
        if (dbType === databaseTypes.readWrite) {
            this.trySwapAnySlaveToMaster();
        }

        this.resolveUAD(database);
    }

    async onDbAvailable(dbName) {
        const dbType = this.availableDatabases.master ? databaseTypes.read : databaseTypes.readWrite;
        this.swapUADtoAD(dbName, dbType);
    }

    async resolveUAD(database) {
        try {
            await connectToDb(database);

            this.onDbAvailable(database.name);
        } catch (e) {
            setTimeout(this.resolveUAD, this.timer);
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
            this.onDbUnavailable(database);
        }
    }

    newRequest(dbType, dbUser) {
        const database =
            dbType === databaseTypes.readWrite ? this.availableDatabases.master : this.getNextSlave();
        const pool = database?.pools[dbUser];
        if (!database || !pool) {
            throwInternalError();
        }

        const request = new Request(pool);

        request.on("error", async (error) => {
            if (error.name === "ConnectionError") {
                await this.onDbUnavailable();
            }
        });

        return request;
    }
}

const poolManager = new PoolManager();

module.exports = poolManager;
