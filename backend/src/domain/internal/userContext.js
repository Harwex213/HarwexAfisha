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

const authorize = async (userId) => {
    if (!userId) {
        return userRoles.GUEST;
    }

    const user = await genericProvider.getById({ modelName: "user", id: userId });
    if (!user) {
        return userRoles.GUEST;
    }

    const userRole = await genericProvider.getById({ modelName: "userRole", id: user?.roleId });
    return userRole.name;
};

module.exports = async (accessToken, expectedRoles) => {
    const userContext = await authenticate(accessToken);
    userContext.role = await authorize(userContext.id);

    if (expectedRoles.includes(userContext.role.toUpperCase()) === false) {
        throwForbidden();
    }
    return userContext;
};
