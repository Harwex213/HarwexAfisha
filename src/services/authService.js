const jwtService = require("./jwtService");
const userDataAccess = require("../dataAccess/access/userDataAccess");
const { validateOnEntityWasGet } = require("../dataAccess/util/validator");
const { userRoles } = require("../config/constants/db");
const { throwUnauthenticated } = require("../util/prepareError");

const register = async ({ username, password, repeatPassword, firstName, lastName, patronymic }) => {
    if (password !== repeatPassword) {
        const error = new Error("Password and repeat Password must match");
        error.code = 400;
        throw error;
    }
    const role = userRoles.user;

    const result = await userDataAccess.insertUser({
        username,
        password,
        firstName,
        lastName,
        patronymic,
        role,
    });
    const id = result.recordset[0].insertedId;
    const accessToken = jwtService.createAccessToken({
        id,
        username,
        role,
    });

    return {
        id,
        username,
        password,
        firstName,
        lastName,
        patronymic,
        role,
        accessToken,
    };
};

const login = async ({ username, password }) => {
    const result = await userDataAccess.getUserByUsername({ username });
    validateOnEntityWasGet(result, "Doesn't find user with such username");

    const user = result.recordset[0];
    if (user.password !== password) {
        throwUnauthenticated("Please, verify your username or password");
    }

    return jwtService.createAccessToken({
        id: user.id,
        username: user.username,
        role: user.role,
    });
};

module.exports = {
    register,
    login,
};
