const sql = require("mssql/msnodesqlv8");
const poolManager = require("../pool/pool");
const poolTypes = require("../pool/poolTypes");

const getPlacesChunk = async ({ cityId }) => {
    const request = poolManager.newRequest(poolTypes.getPlacesChunk, (request) => {
        request.input("cityId", sql.BigInt, cityId);
    });

    return poolManager.executeRequest("s_manager.getPlacesChunk", request);
};

const insertPlace = async ({ name, about, cityId }) => {
    const request = poolManager.newRequest(poolTypes.insertPlace, (request) => {
        request.input("name", sql.NVarChar(50), name);
        request.input("about", sql.NVarChar(sql.MAX), about);
        request.input("cityId", sql.BigInt, cityId);
    });

    return poolManager.executeRequest("s_manager.insertPlace", request);
};

const updatePlace = async ({ id, name, about, cityId }) => {
    const request = poolManager.newRequest(poolTypes.updatePlace, (request) => {
        request.input("id", sql.BigInt, id);
        request.input("name", sql.NVarChar(50), name);
        request.input("about", sql.NVarChar(sql.MAX), about);
        request.input("cityId", sql.BigInt, cityId);
    });

    return poolManager.executeRequest("s_manager.updatePlace", request);
};

const deletePlace = async ({ id }) => {
    const request = poolManager.newRequest(poolTypes.deletePlace, (request) => {
        request.input("id", sql.BigInt, id);
    });

    return poolManager.executeRequest("s_manager.deletePlace", request);
};

module.exports = {
    getPlacesChunk,
    insertPlace,
    updatePlace,
    deletePlace,
};
