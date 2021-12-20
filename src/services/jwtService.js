const config = require("config");
const jwt = require("jsonwebtoken");
const { throwUnauthenticated } = require("../util/prepareError");

const accessTokenConfig = config.get("jwt.accessToken");

const createAccessToken = ({ id, username, role }) =>
    jwt.sign({ id, username, role }, accessTokenConfig.secret, {
        expiresIn: accessTokenConfig.expiresIn,
    });

const verifyAndDecodeAccessToken = (accessToken) => {
    try {
        return jwt.verify(accessToken, accessTokenConfig.secret, {
            complete: true,
        });
    } catch (e) {
        throwUnauthenticated();
    }
};

const decodeAccessToken = (accessToken) => {
    return jwt.decode(accessToken, { complete: true });
};

module.exports = {
    createAccessToken,
    verifyAndDecodeAccessToken,
    decodeAccessToken,
};
