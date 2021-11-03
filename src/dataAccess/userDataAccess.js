const sql = require("mssql/msnodesqlv8");
const pools = require("./core/pools");
const { getPool } = require("./core/poolManager");

const poolsUsers = {
    getUsers: pools.mainDatabase,
    getUserById: pools.mainDatabase,
    getUserByUsername: pools.mainDatabase,
    insertUser: pools.mainDatabase,
    updateUser: pools.mainDatabase,
    deleteUser: pools.mainDatabase,
};

const getUsers = async () => {
    const request = new sql.Request(await getPool(poolsUsers.getUsers));

    return request.execute("getUsers");
};

const getUserById = async ({ id }) => {
    const request = new sql.Request(await getPool(poolsUsers.getUserById));

    request.input("id", sql.BigInt, id);
    return request.execute("getUserById");
};

const getUserByUsername = async ({ username }) => {
    const request = new sql.Request(await getPool(poolsUsers.getUserByUsername));

    request.input("username", sql.NVarChar(50), username);
    return request.execute("getUserByUsername");
};

const insertUser = async ({ username, password, firstName, lastName, patronymic, role }) => {
    const request = new sql.Request(await getPool(poolsUsers.insertUser));

    request.input("username", sql.NVarChar(50), username);
    request.input("password", sql.NVarChar(sql.MAX), password);
    request.input("firstName", sql.NVarChar(50), firstName);
    request.input("lastName", sql.NVarChar(50), lastName);
    request.input("patronymic", sql.NVarChar(50), patronymic ?? null);
    request.input("role", sql.NVarChar(50), role);
    return request.execute("insertUser");
};

const updateUser = async ({ id, username, password, firstName, lastName, patronymic, role }) => {
    const request = new sql.Request(await getPool(poolsUsers.updateUser));

    request.input("id", sql.BigInt, id);
    request.input("username", sql.NVarChar(50), username);
    request.input("password", sql.NVarChar(sql.MAX), password);
    request.input("firstName", sql.NVarChar(50), firstName);
    request.input("lastName", sql.NVarChar(50), lastName);
    request.input("patronymic", sql.NVarChar(50), patronymic ?? null);
    request.input("role", sql.NVarChar(50), role);
    return request.execute("updateUser");
};

const deleteUser = async ({ id }) => {
    const request = new sql.Request(await getPool(poolsUsers.deleteUser));

    request.input("id", sql.BigInt, id);
    return request.execute("deleteUser");
};

module.exports = {
    getUsers,
    getUserById,
    getUserByUsername,
    insertUser,
    updateUser,
    deleteUser,
};
