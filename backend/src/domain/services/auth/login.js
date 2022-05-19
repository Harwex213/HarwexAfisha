const { throwBadRequest } = require("../../exceptions");
const { userRoles } = require("../index").constants;
const getSchemas = require("../index").schemas;
const { map } = require("../index").mapper;
const { genericProvider, userProvider } = require("../index");
const { throwNotFound } = require("../index").exceptions;
const _login = require("./_login");
const { createHash } = require("crypto");
const getSequelizeContext = require("../../../data-access/sequelize");

const handler = async ({ body, setCookie }) => {
    const user = await userProvider.getUserByUsername({
        username: body.username,
    });
    if (!user) {
        throwNotFound("User with such username doesn't exist");
    }

    const hash = createHash("sha256");
    hash.update(body.password);
    if (user.password !== hash.digest("hex")) {
        throwBadRequest("Password was incorrect");
    }
    const role = await genericProvider.getById({
        modelName: "userRole",
        id: user.roleId,
    });

    return await _login({ userContext: { ...user, role: role.name }, setCookie });
};

module.exports = async () => {
    const { user } = await getSchemas();
    const { models } = await getSequelizeContext();

    models.user.addHook("beforeCreate", async (user, options) => {
        const hash = createHash("sha256");
        hash.update(user.password);
        user.password = hash.digest("hex");
    });

    return {
        handler,
        expectedRoles: [userRoles.GUEST],
        schema: await map(user, ["username", "password"], ["username", "password"]),
    };
};
