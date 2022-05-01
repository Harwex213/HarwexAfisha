const dataProvider = require("../index").cinemaMovieProvider;
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

const handler = ({ body }) => dataProvider.getCinemasByCityDateMovie({ ...body });

module.exports = async () => {
    return {
        handler,
        expectedRoles: [userRoles.GUEST, userRoles.USER, userRoles.ADMIN],
        schema,
    };
};
