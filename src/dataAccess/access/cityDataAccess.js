const sql = require("mssql/msnodesqlv8");
const poolManager = require("../pool/pool");
const poolTypes = require("../pool/poolTypes");

const getCitiesChunk = async () => {
    const request = poolManager.newRequest(poolTypes.getCitiesChunk);

    return poolManager.executeRequest("s_manager.getCitiesChunk", request);
};

const getPopularCities = async () => {
    const request = poolManager.newRequest(poolTypes.getPopularCities);

    return poolManager.executeRequest("s_guest.getPopularCities", request);
};

const getCity = async ({ name }) => {
    const request = poolManager.newRequest(poolTypes.getCity, (request) => {
        request.input("name", sql.NVarChar(50), name);
    });

    return poolManager.executeRequest("s_guest.getCity", request);
};

const insertCity = async ({ name, isPopular = 0 }) => {
    const request = poolManager.newRequest(poolTypes.insertCity, (request) => {
        request.input("name", sql.NVarChar(50), name);
        request.input("isPopular", sql.Bit, isPopular);
    });

    return poolManager.executeRequest("s_manager.insertCity", request);
};

const updateCity = async ({ id, name, isPopular = 0 }) => {
    const request = poolManager.newRequest(poolTypes.updateCity, (request) => {
        request.input("id", sql.BigInt, id);
        request.input("name", sql.NVarChar(50), name);
        request.input("isPopular", sql.Bit, isPopular);
    });

    return poolManager.executeRequest("s_manager.updateCity", request);
};

const deleteCity = async ({ id }) => {
    const request = poolManager.newRequest(poolTypes.deleteCity, (request) => {
        request.input("id", sql.BigInt, id);
    });

    return poolManager.executeRequest("s_manager.deleteCity", request);
};

module.exports = {
    getCitiesChunk,
    getPopularCities,
    getCity,
    insertCity,
    updateCity,
    deleteCity,
};
