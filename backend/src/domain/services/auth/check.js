const { genericProvider } = require("../index");
const { userRoles } = require("../index").constants;

const handler = async ({ userContext }) => {
    const user = await genericProvider.getById({
        modelName: "user",
        id: userContext.id,
    });
    const role = await genericProvider.getById({
        modelName: "userRole",
        id: user.roleId,
    });

    return {
        id: user.id,
        username: user.username,
        role: role.name,
        firstName: user.firstName,
        lastName: user.lastName,
    };
};

module.exports = async () => {
    return {
        handler,
        expectedRoles: [userRoles.USER, userRoles.ADMIN],
        schema: {},
    };
};
