const { genericProvider, userProvider } = require("../index");
const { throwBadRequest, throwNotFound } = require("../../exceptions");
const { map } = require("../../schemas/mapper");
const { userRoles } = require("../index").constants;
const getSchemas = require("../index").schemas;

const handler = async ({ body, userContext }) => {
    const potentialUser = await userProvider.getUserByUsername({
        username: body.username,
    });
    if (potentialUser && potentialUser.id !== userContext.id) {
        throwBadRequest("User with such username already exist");
    }

    const [rowsAffected] = await genericProvider.update({
        modelName: "user",
        instance: {
            id: userContext.id,
            username: userContext.username,
            firstName: userContext.firstName,
            lastName: userContext.lastName,
            patronymic: userContext.patronymic ?? "",
        },
    });
    if (rowsAffected === 0) {
        throwNotFound();
    }

    return {
        Message: "Success",
    };
};

module.exports = async () => {
    const { user } = await getSchemas();

    return {
        handler,
        expectedRoles: [userRoles.USER, userRoles.ADMIN],
        schema: await map(
            user,
            ["username", "firstName", "lastName", "patronymic"],
            ["username", "firstName", "lastName"]
        ),
    };
};
