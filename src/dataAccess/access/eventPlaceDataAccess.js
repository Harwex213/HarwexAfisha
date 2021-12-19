const sql = require("mssql/msnodesqlv8");
const poolManager = require("../pool/pool");
const poolTypes = require("../pool/poolTypes");

const getEventsChunkByPlace = async ({ placeId }) => {
    const request = poolManager.newRequest(poolTypes.getEventsChunkByPlace, (request) => {
        request.input("placeId", sql.BigInt, placeId);
    });

    return poolManager.executeRequest("s_manager.getEventsChunkByPlace", request);
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
    getEventsChunkByPlace,
    insertEventPlace,
    deleteEventPlace,
};
