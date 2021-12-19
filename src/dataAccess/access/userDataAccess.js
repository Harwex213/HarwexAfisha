const sql = require("mssql/msnodesqlv8");
const poolManager = require("../pool/pool");
const poolTypes = require("../pool/poolTypes");

const getUsers = async () => {
    const request = poolManager.newRequest(poolTypes.getUsers);

    return poolManager.executeRequest("s_manager.getUsers", request);
};

const getUserById = async ({ id }) => {
    const request = poolManager.newRequest(poolTypes.getUserById, (request) => {
        request.input("id", sql.BigInt, id);
    });

    return poolManager.executeRequest("s_user.getUserById", request);
};

const getUserByUsername = async ({ username }) => {
    const request = poolManager.newRequest(poolTypes.getUserByUsername, (request) => {
        request.input("username", sql.NVarChar(50), username);
    });

    return poolManager.executeRequest("s_user.getUserByUsername", request);
};

const checkUserPassword = async ({ id, password }) => {
    const request = poolManager.newRequest(poolTypes.checkUserPassword, (request) => {
        request.input("id", sql.BigInt, id);
        request.input("password", sql.NVarChar(sql.MAX), password);
    });

    return poolManager.executeRequest("s_user.checkUserPassword", request);
};

const insertUser = async ({ username, password, firstName, lastName, patronymic = null, role }) => {
    const request = poolManager.newRequest(poolTypes.insertUser, (request) => {
        request.input("username", sql.NVarChar(50), username);
        request.input("password", sql.NVarChar(sql.MAX), password);
        request.input("firstName", sql.NVarChar(50), firstName);
        request.input("lastName", sql.NVarChar(50), lastName);
        request.input("patronymic", sql.NVarChar(50), patronymic);
        request.input("role", sql.NVarChar(50), role);
    });

    return poolManager.executeRequest("s_manager.insertUser", request);
};

const updateUser = async ({ id, username, password, firstName, lastName, patronymic = null, role }) => {
    const request = poolManager.newRequest(poolTypes.updateUser, (request) => {
        request.input("id", sql.BigInt, id);
        request.input("username", sql.NVarChar(50), username);
        request.input("password", sql.NVarChar(sql.MAX), password);
        request.input("firstName", sql.NVarChar(50), firstName);
        request.input("lastName", sql.NVarChar(50), lastName);
        request.input("patronymic", sql.NVarChar(50), patronymic);
        request.input("role", sql.NVarChar(50), role);
    });

    return poolManager.executeRequest("s_manager.updateUser", request);
};

const deleteUser = async ({ id }) => {
    const request = poolManager.newRequest(poolTypes.deleteUser, (request) => {
        request.input("id", sql.BigInt, id);
    });

    return poolManager.executeRequest("s_manager.deleteUser", request);
};

module.exports = {
    getUsers,
    getUserById,
    getUserByUsername,
    checkUserPassword,
    insertUser,
    updateUser,
    deleteUser,
};
