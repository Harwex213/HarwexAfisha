const { userRoles } = require("../index").constants;

const handler = async ({ userContext }) => {
    const returnData = {
        ...userContext,
    };

    delete returnData.roleId;
    delete returnData.password;

    return returnData;
};

module.exports = async () => {
    return {
        handler,
        expectedRoles: [userRoles.USER, userRoles.ADMIN],
        schema: {},
    };
};
