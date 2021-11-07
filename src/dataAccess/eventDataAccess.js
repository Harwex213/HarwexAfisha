const sql = require("mssql/msnodesqlv8");
const { pools } = require("./core/pools");
const { getPool } = require("./core/poolManager");

const poolsEvents = {
    getEvents: pools.mainDatabase,
    insertEvent: pools.mainDatabase,
    updateEvent: pools.mainDatabase,
    deleteEvent: pools.mainDatabase,
};

const getEvents = async () => {
    const request = new sql.Request(await getPool(poolsEvents.getEvents));

    return request.execute("getEvents");
};

const insertEvent = async ({ name, description }) => {
    const request = new sql.Request(await getPool(poolsEvents.insertEvent));

    request.input("name", sql.NVarChar(50), name);
    request.input("description", sql.NVarChar(sql.MAX), description);
    return request.execute("insertEvent");
};

const updateEvent = async ({ id, name, description }) => {
    const request = new sql.Request(await getPool(poolsEvents.updateEvent));

    request.input("id", sql.BigInt, id);
    request.input("name", sql.NVarChar(50), name);
    request.input("description", sql.NVarChar(sql.MAX), description);
    return request.execute("updateEvent");
};

const deleteEvent = async ({ id }) => {
    const request = new sql.Request(await getPool(poolsEvents.deleteEvent));

    request.input("id", sql.BigInt, id);
    return request.execute("deleteEvent");
};

module.exports = {
    getEvents,
    insertEvent,
    updateEvent,
    deleteEvent,
};
