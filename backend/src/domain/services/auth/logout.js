const { userRoles } = require("../index").constants;

const handler = async ({ setCookie }) => {
    setCookie("accessToken", "", {
        path: "/",
        httpOnly: true,
        sameSite: "Strict",
        expires: Date.now(),
    });
    setCookie("refreshToken", "", {
        path: "/auth",
        httpOnly: true,
        sameSite: "Strict",
        expires: Date.now(),
    });

    return {
        message: "Success",
    };
};

module.exports = async () => {
    return {
        handler,
        expectedRoles: [userRoles.USER, userRoles.ADMIN],
        schema: {},
    };
};
