const sql = require("mssql/msnodesqlv8");
const poolManager = require("../pool/pool");
const poolTypes = require("../pool/poolTypes");

const getEventsByDateAndCity = async ({ date, cityId }) => {
    const request = poolManager.newRequest(poolTypes.getEventsByDateAndCity, (request) => {
        request.input("cityId", sql.BigInt, cityId);
        request.input("date", sql.DateTime, date);
    });

    return poolManager.executeRequest("s_guest.getEventsByDateAndCity", request);
};

const getEvent = async ({ id }) => {
    const request = poolManager.newRequest(poolTypes.getEventsByDateAndCity, (request) => {
        request.input("id", sql.BigInt, id);
    });

    return poolManager.executeRequest("s_guest.getEvent", request);
};

const insertEvent = async ({ name, description }) => {
    const request = poolManager.newRequest(poolTypes.insertEvent, (request) => {
        request.input("name", sql.NVarChar(50), name);
        request.input("description", sql.NVarChar(sql.MAX), description);
    });

    return poolManager.executeRequest("s_manager.insertEvent", request);
};

const updateEvent = async ({ id, name, description }) => {
    const request = poolManager.newRequest(poolTypes.updateEvent, (request) => {
        request.input("id", sql.BigInt, id);
        request.input("name", sql.NVarChar(50), name);
        request.input("description", sql.NVarChar(sql.MAX), description);
    });

    return poolManager.executeRequest("s_manager.updateEvent", request);
};

const deleteEvent = async ({ id }) => {
    const request = poolManager.newRequest(poolTypes.deleteEvent, (request) => {
        request.input("id", sql.BigInt, id);
    });

    return poolManager.executeRequest("s_manager.deleteEvent", request);
};

module.exports = {
    getEventsByDateAndCity,
    getEvent,
    insertEvent,
    updateEvent,
    deleteEvent,
};
