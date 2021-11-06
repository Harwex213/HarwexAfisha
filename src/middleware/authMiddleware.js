const jwtService = require("../services/jwtService");
const userService = require("../services/userService");

const authenticationType = "Bearer ";

const getAccessTokenFromHeader = (request) => {
    const authHeader = request.headers.authorization;

    if (authHeader.startsWith(authenticationType)) {
        return authHeader.substring(authenticationType.length);
    }

    throw new Error();
};

const authenticationMiddleware = async (accessToken) => {
    const decoded = jwtService.verifyAndDecodeAccessToken(accessToken);
    const username = decoded.payload.username;

    const user = userService.getUserByUsername({ username });
    return user.role;
};

const authorizationMiddleware = async (actualRole, expectedRoles) => {
    if (expectedRoles.includes(actualRole)) {
        return;
    }

    throw new Error();
};

const authMiddleware = (expectedRoles) => async (request, response, next) => {
    try {
        const accessToken = getAccessTokenFromHeader(request);
        const userRole = await authenticationMiddleware(accessToken);
        await authorizationMiddleware(userRole, expectedRoles);

        next();
    } catch (e) {
        const error = new Error("Invalid login credentials");
        error.code = 401;
        next(error);
    }
};

module.exports = authMiddleware;
