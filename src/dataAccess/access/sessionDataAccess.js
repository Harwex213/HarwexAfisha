const sql = require("mssql/msnodesqlv8");
const poolManager = require("../pool/pool");
const poolTypes = require("../pool/poolTypes");

const getSessionsChunk = async ({ eventPlaceId }) => {
    const request = poolManager.newRequest(poolTypes.getSessionsChunk, (request) => {
        request.input("eventPlaceId", sql.BigInt, eventPlaceId);
    });

    return poolManager.executeRequest("s_manager.getSessionsChunk", request);
};

const getSessionsByDateCityEvent = async ({ date, cityId, eventId }) => {
    const request = poolManager.newRequest(poolTypes.getSessionsByDateCityEvent, (request) => {
        request.input("cityId", sql.BigInt, cityId);
        request.input("date", sql.DateTime, date);
        request.input("eventId", sql.BigInt, eventId);
    });

    return poolManager.executeRequest("s_guest.getSessionsByDateCityEvent", request);
};

const getSessionFreeTicketsById = async ({ id }) => {
    const request = poolManager.newRequest(poolTypes.getSessionFreeTicketsById, (request) => {
        request.input("id", sql.BigInt, id);
    });

    return poolManager.executeRequest("s_guest.getSessionFreeTicketsById", request);
};

const insertSession = async ({ eventPlaceId, time, price, ticketsAmount }) => {
    const request = poolManager.newRequest(poolTypes.insertSession, (request) => {
        request.input("eventPlaceId", sql.BigInt, eventPlaceId);
        request.input("time", sql.DateTime, time);
        request.input("price", sql.SmallMoney, price);
        request.input("ticketsAmount", sql.Int, ticketsAmount);
    });

    return poolManager.executeRequest("s_manager.insertSession", request);
};

const updateSession = async ({ id, eventPlaceId, time, price, ticketsAmount }) => {
    const request = poolManager.newRequest(poolTypes.updateSession, (request) => {
        request.input("id", sql.BigInt, id);
        request.input("eventPlaceId", sql.BigInt, eventPlaceId);
        request.input("time", sql.DateTime, time);
        request.input("price", sql.SmallMoney, price);
        request.input("ticketsAmount", sql.Int, ticketsAmount);
    });

    return poolManager.executeRequest("s_manager.updateSession", request);
};

const deleteSession = async ({ id }) => {
    const request = poolManager.newRequest(poolTypes.deleteSession, (request) => {
        request.input("id", sql.BigInt, id);
    });

    return poolManager.executeRequest("s_manager.deleteSession", request);
};

module.exports = {
    getSessionsChunk,
    getSessionsByDateCityEvent,
    getSessionFreeTicketsById,
    insertSession,
    updateSession,
    deleteSession,
};
