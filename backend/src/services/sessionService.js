const sessionDataProvider = require("../data-access/data-providers/sessionProvider");
const { userRoles } = require("../constants");

const schemas = {
    getMoviesByCityAndDate: {
        type: "object",
        properties: {
            cinemaId: {
                type: "number",
                format: "int64",
            },
            date: {
                type: "string",
            },
        },
        required: ["cinemaId", "date"],
    },
    getSessionAvailableTicketsAmount: {
        type: "object",
        properties: {
            sessionId: {
                type: "number",
                format: "int64",
            },
        },
        required: ["sessionId"],
    },
};

module.exports.getSessionsByCinemaAndDate = {
    handler: ({ body }) => sessionDataProvider.getSessionsByCinemaAndDate({ ...body }),
    expectedRoles: [userRoles.GUEST, userRoles.USER, userRoles.ADMIN],
    schema: schemas.getMoviesByCityAndDate,
};

module.exports.getSessionAvailableTicketsAmount = {
    handler: ({ body }) => sessionDataProvider.getSessionAvailableTicketsAmount({ ...body }),
    expectedRoles: [userRoles.GUEST, userRoles.USER, userRoles.ADMIN],
    schema: schemas.getSessionAvailableTicketsAmount,
};
