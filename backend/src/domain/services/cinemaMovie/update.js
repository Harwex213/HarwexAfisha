const { throwNotFound } = require("../../exceptions");
const { sessionProvider } = require("../index");
const { userRoles } = require("../index").constants;
const getSchemas = require("../index").schemas;
const { throwBadRequest } = require("../index").exceptions;
const genericProvider = require("../index").genericProvider;

const handler = async ({ body }) => {
    if (new Date(body.start) > new Date(body.finish)) {
        throwBadRequest("Range of movie showing must be valid");
    }

    const [rowsAffected] = await genericProvider.update({
        modelName: "cinemaMovie",
        instance: body,
    });
    if (rowsAffected === 0) {
        throwNotFound();
    }

    await sessionProvider.deleteAllByThresholdDate({
        cinemaMovieId: body.id,
        threshold: body.finish,
    });

    return {
        message: "Success",
    };
};

module.exports = async () => {
    const { cinemaMovie } = await getSchemas();

    return {
        handler,
        expectedRoles: [userRoles.ADMIN],
        schema: cinemaMovie,
    };
};
