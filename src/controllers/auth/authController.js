const authService = require("../../services/authService");

const schemasOfRequired = {
    login: ["username", "password"],
    register: ["username", "password", "repeatPassword", "firstName", "lastName"],
};

const schemas = {
    login: {
        username: null,
        password: null,
    },
    register: {
        username: null,
        password: null,
        repeatPassword: null,
        firstName: null,
        lastName: null,
        patronymic: null,
    },
};

const login = (model) => {
    return authService.login(model);
};

const register = (model) => {
    return authService.register(model);
};

module.exports = {
    login,
    register,
    schemas,
    schemasOfRequired,
};
