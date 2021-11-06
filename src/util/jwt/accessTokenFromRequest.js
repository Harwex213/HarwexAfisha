const { authenticationType } = require("../../constans");

const getAccessTokenFromRequest = (request) => {
    const authHeader = request.headers.authorization;

    if (authHeader.startsWith(authenticationType)) {
        return authHeader.substring(authenticationType.length);
    }

    throw new Error();
};

module.exports = getAccessTokenFromRequest;
