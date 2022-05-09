const { throwBadRequest } = require("../../exceptions");
const { userRoles } = require("../index").constants;
const { genericProvider, userProvider } = require("../index");
const _login = require("./_login");

const handler = async ({ body, setCookie }) => {
    const potentialUser = await userProvider.getUserByUsername({
        username: body.username,
    });
    if (potentialUser) {
        throwBadRequest("User with such username already exist");
    }
    if (body.password !== body.repeatPassword) {
        throwBadRequest("Passwords doesn't match");
    }

    const roles = await genericProvider.getPart({
        modelName: "userRole",
        offset: 0,
        where: {
            name: userRoles.USER,
        },
    });
    const role = roles.rows[0];

    const user = await genericProvider.create({
        modelName: "user",
        instance: {
            ...body,
            roleId: role.id,
        },
    });

    return {
        ...(await _login({ user, role, setCookie })),
        firstName: user.firstName,
        lastName: user.lastName,
    };
};

const schema = {
    type: "object",
    properties: {
        username: {
            type: "string",
            maxLength: 50,
        },
        password: {
            type: "string",
        },
        repeatPassword: {
            type: "string",
        },
        firstName: {
            type: "string",
            maxLength: 50,
            pattern: "^[A-ZА-Я][a-zа-я,.'-]+$",
        },
        lastName: {
            type: "string",
            maxLength: 50,
            pattern: "^[A-ZА-Я][a-zа-я,.'-]+$",
        },
        patronymic: {
            type: "string",
            maxLength: 50,
        },
    },
    required: ["username", "firstName", "lastName", "password", "repeatPassword"],
};

module.exports = async () => {
    return {
        handler,
        expectedRoles: [userRoles.GUEST],
        schema,
    };
};
