const { throwNotFound } = require("../../exceptions");
const { userRoles } = require("../index").constants;
const getSchemas = require("../index").schemas;
const { mapCreate } = require("../index").mapper;
const { throwBadRequest } = require("../index").exceptions;
const genericProvider = require("../index").genericProvider;
const { time } = require("../index").helpers;

const handler = async ({ body }) => {
    if (new Date().toUTCString() < time.getWithAddMinutes(body.time, 15).toUTCString()) {
        throwBadRequest("Time of session must be more than 15 minutes from current");
    }

    const [rowsAffected] = await genericProvider.update({
        modelName: "session",
        instance: body,
    });
    if (rowsAffected === 0) {
        throwNotFound();
    }

    return {
        message: "Success",
    };
};

module.exports = async () => {
    const { session } = await getSchemas();

    return {
        handler,
        expectedRoles: [userRoles.ADMIN],
        schema: await mapCreate(session),
    };
};
