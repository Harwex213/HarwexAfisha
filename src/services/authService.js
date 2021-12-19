const jwtService = require("./jwtService");
const userDataAccess = require("../dataAccess/access/userDataAccess");
const { validateOnEntityWasGet } = require("../dataAccess/util/validator");
const { userRoles } = require("../config/constants/db");
const { throwUnauthenticated } = require("../util/prepareError");

const getUser = async ({ id }) => {
    const result = await userDataAccess.getUserById({ id });
    validateOnEntityWasGet(result);

    return result.recordset[0];
};

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

    const user = result.recordset[0];
    const accessToken = jwtService.createAccessToken({
        id: user.id,
        username: user.username,
        role: user.role,
    });
    return {
        ...user,
        accessToken,
    };
};

const login = async ({ username, password }) => {
    const result = await userDataAccess.getUserByUsername({ username });
    validateOnEntityWasGet(result, "Doesn't find user with such username");
    const user = result.recordset[0];

    try {
        await userDataAccess.checkUserPassword({ id: user.id, password });
    } catch (e) {
        throwUnauthenticated("Please, verify your username or password");
    }

    const accessToken = jwtService.createAccessToken({
        id: user.id,
        username: user.username,
        role: user.role,
    });
    return {
        ...user,
        accessToken,
    };
};

module.exports = {
    getUser,
    register,
    login,
};
