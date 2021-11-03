const sql = require("mssql/msnodesqlv8");
const pools = require("./core/pools");
const { getPool } = require("./core/poolManager");

const poolsEventPlaces = {
    getEventPlaces: pools.mainDatabase,
    insertEventPlace: pools.mainDatabase,
    deleteEventPlace: pools.mainDatabase,
};

const getEventPlaces = async () => {
    const request = new sql.Request(await getPool(poolsEventPlaces.getEventPlaces));

    return request.execute("getEventPlaces");
};

const insertEventPlace = async ({ eventId, placeId }) => {
    const request = new sql.Request(await getPool(poolsEventPlaces.insertEventPlace));

    request.input("eventId", sql.BigInt, eventId);
    request.input("placeId", sql.BigInt, placeId);
    return request.execute("insertEventPlace");
};

const deleteEventPlace = async ({ id }) => {
    const request = new sql.Request(await getPool(poolsEventPlaces.deleteEventPlace));

    request.input("id", sql.BigInt, id);
    return request.execute("deleteEventPlace");
};

module.exports = {
    getEventPlaces,
    insertEventPlace,
    deleteEventPlace,
};
