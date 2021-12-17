const authService = require("../../services/authService");
const getAccessTokenFromRequest = require("../../util/jwt/accessTokenFromRequest");
const jwtService = require("../../services/jwtService");

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

const getUser = (request) => {
    const accessToken = getAccessTokenFromRequest(request);
    const decoded = jwtService.decodeAccessToken(accessToken);
    const model = {
        id: decoded.payload.id,
    };

    return authService.getUser(model);
};

const login = (model) => {
    return authService.login(model);
};

const register = (model) => {
    return authService.register(model);
};

module.exports = {
    getUser,
    login,
    register,
    schemas,
    schemasOfRequired,
};
