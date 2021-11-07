const sql = require("mssql/msnodesqlv8");
const { pools } = require("./core/pools");
const { getPool } = require("./core/poolManager");

const poolsSessions = {
    getSessions: pools.mainDatabase,
    getSessionFreeTicketsById: pools.mainDatabase,
    insertSession: pools.mainDatabase,
    updateSession: pools.mainDatabase,
    deleteSession: pools.mainDatabase,
};

const getSessions = async () => {
    const request = new sql.Request(await getPool(poolsSessions.getSessions));

    return request.execute("getSessions");
};

const getSessionFreeTicketsById = async ({ id }) => {
    const request = new sql.Request(await getPool(poolsSessions.getSessionFreeTicketsById));

    request.input("id", sql.BigInt, id);
    return request.execute("getSessionFreeTicketsById");
};

const insertSession = async ({ eventPlaceId, time, ticketsAmount }) => {
    const request = new sql.Request(await getPool(poolsSessions.insertSession));

    request.input("eventPlaceId", sql.BigInt, eventPlaceId);
    request.input("time", sql.DateTime, time);
    request.input("ticketsAmount", sql.Int, ticketsAmount);
    return request.execute("insertSession");
};

const updateSession = async ({ id, eventPlaceId, time, ticketsAmount }) => {
    const request = new sql.Request(await getPool(poolsSessions.updateSession));

    request.input("id", sql.BigInt, id);
    request.input("eventPlaceId", sql.BigInt, eventPlaceId);
    request.input("time", sql.DateTime, time);
    request.input("ticketsAmount", sql.Int, ticketsAmount);
    return request.execute("updateSession");
};

const deleteSession = async ({ id }) => {
    const request = new sql.Request(await getPool(poolsSessions.deleteSession));

    request.input("id", sql.BigInt, id);
    return request.execute("deleteSession");
};

module.exports = {
    getSessions,
    getSessionFreeTicketsById,
    insertSession,
    updateSession,
    deleteSession,
};
