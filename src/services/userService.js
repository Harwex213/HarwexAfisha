const userDataAccess = require("../dataAccess/userDataAccess");
const { checkOnEntityFound } = require("./helper/checker");

const getUsers = async () => {
    const result = await userDataAccess.getUsers();

    return result.recordset;
};

const getUserByUsername = async ({ username }) => {
    const result = await userDataAccess.getUserByUsername({ username });
    checkOnEntityFound(result);

    return result.recordset[0];
};

const insertUser = async ({ username, password, firstName, lastName, patronymic, role }) => {
    const result = await userDataAccess.insertUser({
        username,
        password,
        firstName,
        lastName,
        patronymic,
        role,
    });

    return {
        id: result.recordset[0].insertedId,
        username,
        password,
        firstName,
        lastName,
        patronymic,
        role,
    };
};

const updateUser = async ({ id, username, password, firstName, lastName, patronymic, role }) => {
    const result = await userDataAccess.updateUser({
        id,
        username,
        password,
        firstName,
        lastName,
        patronymic,
        role,
    });
    checkOnEntityFound(result);

    return {
        id,
        username,
        password,
        firstName,
        lastName,
        patronymic,
        role,
    };
};

const deleteUser = async ({ id }) => {
    const result = await userDataAccess.deleteUser({ id });
    checkOnEntityFound(result);
};

module.exports = {
    getUsers,
    getUserByUsername,
    insertUser,
    updateUser,
    deleteUser,
};
