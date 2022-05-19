const jwt = require("jsonwebtoken");
const jwtConfig = require("config").get("jwt");

module.exports = async ({ userContext, setCookie }) => {
    const accessToken = jwt.sign(
        {
            id: userContext.id,
            username: userContext.username,
            role: userContext.role,
        },
        jwtConfig.accessToken.secret,
        {
            expiresIn: jwtConfig.accessToken.expiresIn,
        }
    );
    const refreshToken = jwt.sign(
        {
            id: userContext.id,
            username: userContext.username,
            role: userContext.role,
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

    const returnData = {
        ...userContext,
    };

    delete returnData.roleId;
    delete returnData.password;

    return returnData;
};
