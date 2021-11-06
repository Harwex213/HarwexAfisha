const jwtService = require("./jwtService");
const userDataAccess = require("../dataAccess/userDataAccess");
const { isRowsAffectedZero } = require("./helper/checker");
const { userRoles } = require("../constans");

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
    const accessToken = jwtService.createAccessToken({
        username,
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
        accessToken,
    };
};

const login = async ({ username, password }) => {
    const result = await userDataAccess.getUserByUsername({ username });
    if (isRowsAffectedZero(result)) {
        const error = new Error("Doesn't find user with such username");
        error.code = 401;
        throw error;
    }

    const user = result.recordset[0];
    if (user.password !== password) {
        const error = new Error("Please, verify your username or password");
        error.code = 401;
        throw error;
    }

    return jwtService.createAccessToken({
        username: user.username,
        role: user.role,
    });
};

module.exports = {
    register,
    login,
};
