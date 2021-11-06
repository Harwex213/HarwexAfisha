const jwtService = require("../services/jwtService");
const userService = require("../services/userService");
const accessTokenFromRequest = require("../util/jwt/accessTokenFromRequest");
const { throwUnauthenticated } = require("../util/prepareError");

const authenticationMiddleware = async (accessToken) => {
    const decoded = await jwtService.verifyAndDecodeAccessToken(accessToken);
    const username = decoded.payload.username;

    const user = await userService.getUserByUsername({ username });
    return user.role;
};

const authorizationMiddleware = (actualRole, expectedRoles) => {
    if (expectedRoles.includes(actualRole)) {
        throwUnauthenticated();
    }
};

const authMiddleware = (expectedRoles) => async (request, response, next) => {
    try {
        const accessToken = accessTokenFromRequest(request);
        const userRole = await authenticationMiddleware(accessToken);
        authorizationMiddleware(userRole, expectedRoles);

        next();
    } catch (error) {
        next(error);
    }
};

module.exports = authMiddleware;
