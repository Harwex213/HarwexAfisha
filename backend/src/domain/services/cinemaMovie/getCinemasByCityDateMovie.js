const dataProvider = require("../index").cinemaMovieProvider;
const sessionDataProvider = require("../index").sessionProvider;
const { userRoles } = require("../index").constants;

const schema = {
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
};

const handler = async ({ body }) => {
    const cinemas = await dataProvider.getCinemasByCityDateMovie({ ...body });
    for (const cinema of cinemas) {
        cinema.sessions = await sessionDataProvider.getSessionsByCinemaDateMovie({
            cinemaId: cinema.id,
            movieId: body.movieId,
            date: body.date,
        });
    }
    return cinemas;
};

module.exports = async () => {
    return {
        handler,
        expectedRoles: [userRoles.GUEST, userRoles.USER, userRoles.ADMIN],
        schema,
    };
};
