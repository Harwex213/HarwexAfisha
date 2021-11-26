const sql = require("mssql/msnodesqlv8");
const poolManager = require("./core/pool");
const poolTypes = require("./core/poolTypes");

const getPlaces = async () => {
    const request = poolManager.newRequest(poolTypes.getPlaces);

    return poolManager.executeRequest("getPlaces", request);
};

const insertPlace = async ({ name, about, cityName }) => {
    const request = poolManager.newRequest(poolTypes.insertPlace, (request) => {
        request.input("name", sql.NVarChar(50), name);
        request.input("about", sql.NVarChar(sql.MAX), about);
        request.input("cityName", sql.NVarChar(50), cityName);
    });

    return poolManager.executeRequest("insertPlace", request);
};

const updatePlace = async ({ id, name, about, cityName }) => {
    const request = poolManager.newRequest(poolTypes.updatePlace, (request) => {
        request.input("id", sql.BigInt, id);
        request.input("name", sql.NVarChar(50), name);
        request.input("about", sql.NVarChar(sql.MAX), about);
        request.input("cityName", sql.NVarChar(50), cityName);
    });

    return poolManager.executeRequest("updatePlace", request);
};

const deletePlace = async ({ id }) => {
    const request = poolManager.newRequest(poolTypes.deletePlace, (request) => {
        request.input("id", sql.BigInt, id);
    });

    return poolManager.executeRequest("deletePlace", request);
};

module.exports = {
    getPlaces,
    insertPlace,
    updatePlace,
    deletePlace,
};
