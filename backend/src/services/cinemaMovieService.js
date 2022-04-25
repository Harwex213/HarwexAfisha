const cinemaMovieDataProvider = require("../data-access/data-providers/cinemaMovieProvider");
const { userRoles } = require("../constants");

const schemas = {
    getMoviesByCityAndDate: {
        type: "object",
        properties: {
            cityId: {
                type: "number",
                format: "int64",
            },
            date: {
                type: "string",
                format: "date",
            },
        },
        required: ["cityId", "date"],
    },
    getCinemasByCityDateMovie: {
        type: "object",
        properties: {
            cityId: {
                type: "number",
                format: "int64",
            },
            movieId: {
                type: "number",
                format: "int64",
            },
            date: {
                type: "string",
                format: "date",
            },
        },
        required: ["cityId", "movieId", "date"],
    },
};

module.exports.getMoviesByCityAndDate = {
    handler: ({ body }) => cinemaMovieDataProvider.getMoviesByCityAndDate({ ...body }),
    expectedRoles: [userRoles.GUEST, userRoles.USER, userRoles.ADMIN],
    schema: schemas.getMoviesByCityAndDate,
};

module.exports.getCinemasByCityDateMovie = {
    handler: ({ body }) => cinemaMovieDataProvider.getCinemasByCityDateMovie({ ...body }),
    expectedRoles: [userRoles.GUEST, userRoles.USER, userRoles.ADMIN],
    schema: schemas.getCinemasByCityDateMovie,
};
