const jwt = require("jsonwebtoken");
const jwtConfig = require("config").get("jwt");
const { throwForbidden, throwNotFound } = require("../../exceptions");
const { genericProvider } = require("../index");
const _login = require("./_login");
const { userRoles } = require("../index").constants;

const handler = async ({ refreshToken, setCookie }) => {
    let decoded = null;
    try {
        decoded = jwt.verify(refreshToken, jwtConfig.refreshToken.secret, {
            complete: true,
        }).payload;
    } catch (e) {
        throwForbidden("Invalid token");
    }

    const oldRefreshToken = await genericProvider.getById({
        modelName: "refreshToken",
        id: refreshToken,
    });
    if (oldRefreshToken) {
        throwForbidden("Invalid token");
    }
    await genericProvider.create({
        modelName: "refreshToken",
        instance: {
            id: refreshToken,
        },
    });

    const user = await genericProvider.getById({
        modelName: "user",
        id: decoded?.id,
    });
    if (!user) {
        throwNotFound("Such user doesn't exist");
    }
    const role = await genericProvider.getById({
        modelName: "userRole",
        id: user.roleId,
    });

    await _login({ userContext: { ...user, role: role.name }, setCookie });

    return {
        message: "Success",
    };
};

module.exports = async () => {
    return {
        handler,
        expectedRoles: [userRoles.GUEST, userRoles.USER, userRoles.ADMIN],
        schema: {},
    };
};
