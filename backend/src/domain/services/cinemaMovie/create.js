const { userRoles } = require("../index").constants;
const getSchemas = require("../index").schemas;
const { mapCreate } = require("../index").mapper;
const { throwBadRequest } = require("../index").exceptions;
const genericProvider = require("../index").genericProvider;

const handler = async ({ body }) => {
    if (new Date(body.start) > new Date(body.finish)) {
        throwBadRequest("Range of movie showing must be valid");
    }

    return await genericProvider.create({
        modelName: "cinemaMovie",
        instance: body,
    });
};

module.exports = async () => {
    const { cinemaMovie } = await getSchemas();

    return {
        handler,
        expectedRoles: [userRoles.ADMIN],
        schema: await mapCreate(cinemaMovie),
    };
};
