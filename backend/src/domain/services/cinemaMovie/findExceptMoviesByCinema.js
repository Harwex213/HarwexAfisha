const dataProvider = require("../index").cinemaMovieProvider;
const { userRoles } = require("../index").constants;

const handler = ({ body }) => dataProvider.findExceptMoviesByCinema({ ...body });

const schema = {
    type: "object",
    properties: {
        cinemaId: {
            type: "number",
            format: "int64",
        },
        movieName: {
            type: "string",
        },
    },
    required: ["cinemaId"],
};

module.exports = async () => {
    return {
        handler,
        expectedRoles: [userRoles.GUEST, userRoles.USER, userRoles.ADMIN],
        schema,
    };
};
