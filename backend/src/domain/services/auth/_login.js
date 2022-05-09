const jwt = require("jsonwebtoken");
const jwtConfig = require("config").get("jwt");

module.exports = async ({ user, role, setCookie }) => {
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
