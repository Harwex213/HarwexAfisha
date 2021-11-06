const config = require("config");
const jwt = require("jsonwebtoken");

const accessTokenConfig = config.get("jwt.accessToken");

const createAccessToken = ({ username, role }) =>
    jwt.sign({ username, role }, accessTokenConfig.secret, {
        expiresIn: accessTokenConfig.expiresIn,
    });

const verifyAndDecodeAccessToken = async (accessToken) => {
    try {
        return jwt.verify(accessToken, accessTokenConfig.secret, {
            complete: true,
        });
    } catch (e) {
        const error = new Error(e.message);
        error.code = 401;
        throw error;
    }
};

module.exports = {
    createAccessToken,
    verifyAndDecodeAccessToken,
};
