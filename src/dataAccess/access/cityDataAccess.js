const sql = require("mssql/msnodesqlv8");
const poolManager = require("../pool/pool");
const poolTypes = require("../pool/poolTypes");

const getCities = async () => {
    const request = poolManager.newRequest(poolTypes.getCities);

    return poolManager.executeRequest("getCities", request);
};

const insertCity = async ({ name }) => {
    const request = poolManager.newRequest(poolTypes.insertCity, (request) => {
        request.input("name", sql.NVarChar(50), name);
    });

    return poolManager.executeRequest("insertCity", request);
};

const updateCity = async ({ id, name }) => {
    const request = poolManager.newRequest(poolTypes.updateCity, (request) => {
        request.input("id", sql.BigInt, id);
        request.input("name", sql.NVarChar(50), name);
    });

    return poolManager.executeRequest("updateCity", request);
};

const deleteCity = async ({ id }) => {
    const request = poolManager.newRequest(poolTypes.deleteCity, (request) => {
        request.input("id", sql.BigInt, id);
    });

    return poolManager.executeRequest("deleteCity", request);
};

module.exports = {
    getCities,
    insertCity,
    updateCity,
    deleteCity,
};
