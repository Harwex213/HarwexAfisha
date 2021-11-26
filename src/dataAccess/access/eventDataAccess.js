const sql = require("mssql/msnodesqlv8");
const poolManager = require("../pool/pool");
const poolTypes = require("../pool/poolTypes");

const getEvents = async () => {
    const request = poolManager.newRequest(poolTypes.getEvents);

    return poolManager.executeRequest("getEvents", request);
};

const insertEvent = async ({ name, description }) => {
    const request = poolManager.newRequest(poolTypes.insertEvent, (request) => {
        request.input("name", sql.NVarChar(50), name);
        request.input("description", sql.NVarChar(sql.MAX), description);
    });

    return poolManager.executeRequest("insertEvent", request);
};

const updateEvent = async ({ id, name, description }) => {
    const request = poolManager.newRequest(poolTypes.updateEvent, (request) => {
        request.input("id", sql.BigInt, id);
        request.input("name", sql.NVarChar(50), name);
        request.input("description", sql.NVarChar(sql.MAX), description);
    });

    return poolManager.executeRequest("updateEvent", request);
};

const deleteEvent = async ({ id }) => {
    const request = poolManager.newRequest(poolTypes.deleteEvent, (request) => {
        request.input("id", sql.BigInt, id);
    });

    return poolManager.executeRequest("deleteEvent", request);
};

module.exports = {
    getEvents,
    insertEvent,
    updateEvent,
    deleteEvent,
};
