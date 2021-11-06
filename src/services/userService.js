const userDataAccess = require("../dataAccess/userDataAccess");
const {
    validateOnEntityWasGet,
    validateOnEntityUpdated,
    validateOnEntityDelete,
} = require("./helper/validator");

const getUsers = async () => {
    const result = await userDataAccess.getUsers();

    return result.recordset;
};

const getUserById = async ({ id }) => {
    const result = await userDataAccess.getUserById({ id });
    validateOnEntityWasGet(result);

    return result.recordset[0];
};

const getUserByUsername = async ({ username }) => {
    const result = await userDataAccess.getUserByUsername({ username });
    validateOnEntityWasGet(result);

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
    validateOnEntityUpdated(result);

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
    validateOnEntityDelete(result);

    return "Successfully deleted";
};

module.exports = {
    getUsers,
    getUserById,
    getUserByUsername,
    insertUser,
    updateUser,
    deleteUser,
};
