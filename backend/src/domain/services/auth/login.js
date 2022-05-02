const jwt = require("jsonwebtoken");
const jwtConfig = require("config").get("jwt");
const { throwBadRequest } = require("../../exceptions");
const { userRoles } = require("../index").constants;
const getSchemas = require("../index").schemas;
const { map } = require("../index").mapper;
const { genericProvider, userProvider } = require("../index");
const { throwNotFound } = require("../index").exceptions;

const handler = async ({ body, setCookie }) => {
    const user = await userProvider.getUserByUsername({
        username: body.username,
    });
    if (!user) {
        throwNotFound("User with such username doesn't exist");
    }
    if (user.password !== body.password) {
        throwBadRequest("Password was incorrect");
    }
    const role = await genericProvider.getById({
        modelName: "userRole",
        id: user.roleId,
    });

    const accessToken = jwt.sign(
        {
            id: user.id,
            username: user.username,
            role: role.name,
        },
        jwtConfig.accessToken.secret,
        {
            expiresIn: jwtConfig.accessToken.expiresIn,
        }
    );
    const refreshToken = jwt.sign(
        {
            id: user.id,
            username: user.username,
            role: role.name,
        },
        jwtConfig.refreshToken.secret,
        {
            expiresIn: jwtConfig.refreshToken.expiresIn,
        }
    );

    setCookie("accessToken", accessToken, {
        path: "/",
        httpOnly: true,
        sameSite: "Strict",
    });
    setCookie("refreshToken", refreshToken, {
        path: "/auth",
        httpOnly: true,
        sameSite: "Strict",
    });

    return {
        id: user.id,
        username: user.username,
        role: role.name,
    };
};

module.exports = async () => {
    const { user } = await getSchemas();

    return {
        handler,
        expectedRoles: [userRoles.GUEST, userRoles.USER, userRoles.ADMIN],
        schema: await map(user, ["username", "password"], ["username", "password"]),
    };
};
