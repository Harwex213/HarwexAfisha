const { genericProvider } = require("../index");
const _login = require("./_login");
const { throwBadRequest, throwNotFound } = require("../../exceptions");
const { createHash } = require("crypto");
const { userRoles } = require("../index").constants;

const handler = async ({ body, userContext, setCookie }) => {
    const hash = createHash("sha256");
    hash.update(body.oldPassword);
    if (userContext.password !== hash.digest("hex")) {
        throwBadRequest("Password was incorrect");
    }
    if (body.password !== body.repeatPassword) {
        throwBadRequest("Passwords doesn't match");
    }

    const hashNewPass = createHash("sha256");
    hashNewPass.update(body.password);
    const [rowsAffected] = await genericProvider.update({
        modelName: "user",
        instance: {
            id: userContext.id,
            password: hashNewPass.digest("hex"),
        },
    });
    if (rowsAffected === 0) {
        throwNotFound();
    }

    return await _login({ userContext, setCookie });
};

const schema = {
    type: "object",
    properties: {
        oldPassword: {
            type: "string",
            maxLength: 50,
        },
        password: {
            type: "string",
            maxLength: 50,
        },
        repeatPassword: {
            type: "string",
            maxLength: 50,
        },
    },
    required: ["oldPassword", "password", "repeatPassword"],
};

module.exports = async () => {
    return {
        handler,
        expectedRoles: [userRoles.USER, userRoles.ADMIN],
        schema: schema,
    };
};
