const sql = require("mssql/msnodesqlv8");
const { pools } = require("./core/pools");
const { getPool } = require("./core/poolManager");

const poolsCities = {
    getCities: pools.replicationDatabase,
    insertCity: pools.mainDatabase,
    updateCity: pools.mainDatabase,
    deleteCity: pools.mainDatabase,
};

const getCities = async () => {
    const request = new sql.Request(await getPool(poolsCities.getCities));

    return request.execute("getCities");
};

const insertCity = async ({ name }) => {
    const request = new sql.Request(await getPool(poolsCities.insertCity));

    request.input("name", sql.NVarChar(50), name);
    return request.execute("insertCity");
};

const updateCity = async ({ id, name }) => {
    const request = new sql.Request(await getPool(poolsCities.updateCity));

    request.input("id", sql.BigInt, id);
    request.input("name", sql.NVarChar(50), name);
    return request.execute("updateCity");
};

const deleteCity = async ({ id }) => {
    const request = new sql.Request(await getPool(poolsCities.deleteCity));

    request.input("id", sql.BigInt, id);
    return request.execute("deleteCity");
};

module.exports = {
    getCities,
    insertCity,
    updateCity,
    deleteCity,
};
