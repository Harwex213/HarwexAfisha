const { userRoles } = require("../index").constants;
const getSchemas = require("../index").schemas;
const { mapCreate } = require("../index").mapper;
const { throwBadRequest } = require("../index").exceptions;
const genericProvider = require("../index").genericProvider;
const { time } = require("../index").helpers;

const handler = async ({ body }) => {
    if (new Date(body.time) < time.getWithAddMinutes(body.time, 15)) {
        throwBadRequest("Time of session must be more than 15 minutes from current");
    }

    return await genericProvider.create({
        modelName: "session",
        instance: body,
    });
};

module.exports = async () => {
    const { session } = await getSchemas();

    return {
        handler,
        expectedRoles: [userRoles.ADMIN],
        schema: await mapCreate(session),
    };
};
