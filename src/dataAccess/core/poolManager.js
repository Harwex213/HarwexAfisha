const { ConnectionPool } = require("mssql/msnodesqlv8");
const pools = {};
const poolsNamesBuffer = new Map();

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const createPool = async (config, name) => {
    try {
        console.log(`Started creating connection pool ${name}`);
        poolsNamesBuffer.set(name, name);

        const pool = await new ConnectionPool(config).connect();

        pools[name] = pool;

        console.log(`Successfully created connection pool ${name}`);
        return pool;
    } catch (e) {
        console.log(`Failed to create connection pool ${name}`);
        throw e;
    } finally {
        poolsNamesBuffer.delete(name);
    }
};

const closePool = (name) => {
    const pool = getPool(name);

    if (pool) {
        delete pools[name];
        return pool.close();
    }
};

const getFirstFoundPool = () => {
    const poolsEntries = Object.entries(pools);
    if (poolsEntries.length !== 0) {
        return poolsEntries[0][1];
    }
};

const getPool = async ({ name }) => {
    while (poolsNamesBuffer.get(name)) {
        await sleep(300);
    }
    return pools[name] ? pools[name] : getFirstFoundPool();
};

module.exports = {
    closePool,
    createPool,
    getPool,
};
