const sql = require("mssql/msnodesqlv8");
const poolManager = require("../pool/pool");
const poolTypes = require("../pool/poolTypes");

const getEventPlaces = async () => {
    const request = poolManager.newRequest(poolTypes.getEventPlaces);

    return poolManager.executeRequest("s_manager.getEventPlaces", request);
};

const insertEventPlace = async ({ eventId, placeId }) => {
    const request = poolManager.newRequest(poolTypes.insertEventPlace, (request) => {
        request.input("eventId", sql.BigInt, eventId);
        request.input("placeId", sql.BigInt, placeId);
    });

    return poolManager.executeRequest("s_manager.insertEventPlace", request);
};

const deleteEventPlace = async ({ id }) => {
    const request = poolManager.newRequest(poolTypes.deleteEventPlace, (request) => {
        request.input("id", sql.BigInt, id);
    });

    return poolManager.executeRequest("s_manager.deleteEventPlace", request);
};

module.exports = {
    getEventPlaces,
    insertEventPlace,
    deleteEventPlace,
};
