const jwt = require("jsonwebtoken");
const config = require("config");
const { userRoles } = require("../../constants");
const genericProvider = require("../../data-access/data-providers/genericProvider");
const { throwForbidden } = require("../exceptions");

const authenticate = async (accessToken) => {
    try {
        const decoded = jwt.verify(accessToken, config.get("jwt.accessToken.secret"), {
            complete: true,
        });
        return decoded.payload;
    } catch (e) {
        return {};
    }
};

const authorize = async (userContext) => {
    if (!userContext) {
        return {
            role: userRoles.GUEST,
        };
    }

    const user = await genericProvider.getById({ modelName: "user", id: userContext.id });
    if (!user) {
        return {
            role: userRoles.GUEST,
        };
    }

    const userRole = await genericProvider.getById({ modelName: "userRole", id: user.roleId });
    return {
        ...user,
        role: userRole.name,
    };
};

module.exports = async (accessToken, expectedRoles) => {
    let userContext = await authenticate(accessToken);
    userContext = await authorize(userContext);

    if (expectedRoles.includes(userContext.role.toUpperCase()) === false) {
        throwForbidden();
    }
    return userContext;
};
