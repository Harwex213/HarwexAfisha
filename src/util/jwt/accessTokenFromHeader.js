const { authenticationType } = require("../../constans");

const getAccessTokenFromHeader = (request) => {
    const authHeader = request.headers.authorization;

    if (authHeader.startsWith(authenticationType)) {
        return authHeader.substring(authenticationType.length);
    }

    throw new Error();
};

module.exports = getAccessTokenFromHeader;
