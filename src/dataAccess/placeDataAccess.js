const sql = require("mssql/msnodesqlv8");
const pools = require("./core/pools");
const { getPool } = require("./core/poolManager");

const poolsPlaces = {
    getPlaces: pools.mainDatabase,
    insertPlace: pools.mainDatabase,
    updatePlace: pools.mainDatabase,
    deletePlace: pools.mainDatabase,
};

const getPlaces = async () => {
    const request = new sql.Request(await getPool(poolsPlaces.getPlaces));

    return request.execute("getPlaces");
};

const insertPlace = async ({ name, about, cityName }) => {
    const request = new sql.Request(await getPool(poolsPlaces.insertPlace));

    request.input("name", sql.NVarChar(50), name);
    request.input("about", sql.NVarChar(sql.MAX), about);
    request.input("cityName", sql.NVarChar(50), cityName);
    return request.execute("insertPlace");
};

const updatePlace = async ({ id, name, about, cityName }) => {
    const request = new sql.Request(await getPool(poolsPlaces.updatePlace));

    request.input("id", sql.BigInt, id);
    request.input("name", sql.NVarChar(50), name);
    request.input("about", sql.NVarChar(sql.MAX), about);
    request.input("cityName", sql.NVarChar(50), cityName);
    return request.execute("updatePlace");
};

const deletePlace = async ({ id }) => {
    const request = new sql.Request(await getPool(poolsPlaces.deletePlace));

    request.input("id", sql.BigInt, id);
    return request.execute("deletePlace");
};

module.exports = {
    getPlaces,
    insertPlace,
    updatePlace,
    deletePlace,
};
