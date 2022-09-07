const { userRoles } = require("../index").constants;
const cookiesConfig = require("config").get("cookies");

const handler = async ({ setCookie }) => {
    setCookie("accessToken", "", {
        path: "/",
        httpOnly: true,
        sameSite: cookiesConfig.sameSite,
        expires: Date.now(),
    });
    setCookie("refreshToken", "", {
        path: "/api/auth",
        httpOnly: true,
        sameSite: cookiesConfig.sameSite,
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
