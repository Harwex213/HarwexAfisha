const sql = require("mssql/msnodesqlv8");
const poolManager = require("../pool/pool");
const poolTypes = require("../pool/poolTypes");

const getSessions = async () => {
    const request = poolManager.newRequest(poolTypes.getSessions);

    return poolManager.executeRequest("getSessions", request);
};

const getSessionFreeTicketsById = async ({ id }) => {
    const request = poolManager.newRequest(poolTypes.getSessionFreeTicketsById, (request) => {
        request.input("id", sql.BigInt, id);
    });

    return poolManager.executeRequest("getSessionFreeTicketsById", request);
};

const insertSession = async ({ eventPlaceId, time, ticketsAmount }) => {
    const request = poolManager.newRequest(poolTypes.insertSession, (request) => {
        request.input("eventPlaceId", sql.BigInt, eventPlaceId);
        request.input("time", sql.DateTime, time);
        request.input("ticketsAmount", sql.Int, ticketsAmount);
    });

    return poolManager.executeRequest("insertSession", request);
};

const updateSession = async ({ id, eventPlaceId, time, ticketsAmount }) => {
    const request = poolManager.newRequest(poolTypes.updateSession, (request) => {
        request.input("id", sql.BigInt, id);
        request.input("eventPlaceId", sql.BigInt, eventPlaceId);
        request.input("time", sql.DateTime, time);
        request.input("ticketsAmount", sql.Int, ticketsAmount);
    });

    return poolManager.executeRequest("updateSession", request);
};

const deleteSession = async ({ id }) => {
    const request = poolManager.newRequest(poolTypes.deleteSession, (request) => {
        request.input("id", sql.BigInt, id);
    });

    return poolManager.executeRequest("deleteSession", request);
};

module.exports = {
    getSessions,
    getSessionFreeTicketsById,
    insertSession,
    updateSession,
    deleteSession,
};
