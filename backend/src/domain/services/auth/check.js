const { userRoles } = require("../index").constants;

const handler = async ({ userContext }) => {
    return {
        id: userContext.id,
        username: userContext.username,
        role: userContext.role,
    };
};

module.exports = async () => {
    return {
        handler,
        expectedRoles: [userRoles.USER, userRoles.ADMIN],
        schema: {},
    };
};
