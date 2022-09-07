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
            username: body.username,
            firstName: body.firstName,
            lastName: body.lastName,
            patronymic: body.patronymic,
            email: body.email,
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
            ["username", "firstName", "lastName", "patronymic", "email"],
            ["username", "firstName", "lastName"]
        ),
    };
};
