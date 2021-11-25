const { authenticationType } = require("../../../config/constants/api");

const getAccessTokenFromRequest = (request) => {
    const authHeader = request.headers.authorization;

    if (authHeader && authHeader.startsWith(authenticationType)) {
        return authHeader.substring(authenticationType.length);
    }
};

module.exports = getAccessTokenFromRequest;
