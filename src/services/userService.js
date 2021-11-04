const userDataAccess = require("../dataAccess/userDataAccess");
const { checkOnUpdated, checkOnDelete } = require("./helper/checker");

const getUsers = async () => {
    const result = await userDataAccess.getUsers();

    return result.recordset;
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
    checkOnUpdated(result);

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
    checkOnDelete(result);
};

module.exports = {
    getUsers,
    insertUser,
    updateUser,
    deleteUser,
};