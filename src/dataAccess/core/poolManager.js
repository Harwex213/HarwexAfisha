const { ConnectionPool } = require("mssql/msnodesqlv8");
const pools = {};
const poolsNamesBuffer = new Map();

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const createPool = async (config, name) => {
    poolsNamesBuffer.set(name, name);

    const pool = await new ConnectionPool(config).connect();

    pools[name] = pool;
    poolsNamesBuffer.delete(name);

    return pool;
};

const closePool = (name) => {
    const pool = getPool(name);

    if (pool) {
        delete pools[name];
        return pool.close();
    }
};

const getPool = async ({ config, name }) => {
    while (poolsNamesBuffer.get(name)) {
        await sleep(300);
    }
    return pools[name] ? pools[name] : await createPool(config, name);
};

module.exports = {
    closePool,
    createPool,
    getPool,
};
