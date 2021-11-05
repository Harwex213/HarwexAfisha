const userService = require("../../services/userService");

const schemasOfRequired = {
    postUser: ["username", "password", "firstName", "lastName", "role"],
    putUser: ["id", "username", "password", "firstName", "lastName", "role"],
    deleteUser: ["id"],
};

const schemas = {
    postUser: {
        username: null,
        password: null,
        firstName: null,
        lastName: null,
        patronymic: null,
        role: null,
    },
    putUser: {
        id: null,
        username: null,
        password: null,
        firstName: null,
        lastName: null,
        patronymic: null,
        role: null,
    },
    deleteUser: {
        id: null,
    },
};

const getUsers = () => {
    return userService.getUsers();
};

const postUser = (model) => {
    return userService.insertUser(model);
};

const putUser = (model) => {
    return userService.updateUser(model);
};

const deleteUser = (model) => {
    return userService.deleteUser(model);
};

module.exports = {
    getUsers,
    postUser,
    putUser,
    deleteUser,
    schemas,
    schemasOfRequired,
};
