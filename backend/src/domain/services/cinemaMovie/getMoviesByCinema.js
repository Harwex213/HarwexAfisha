const dataProvider = require("../index").cinemaMovieProvider;
const { userRoles } = require("../index").constants;

const handler = ({ body }) => dataProvider.getMoviesByCinema({ ...body });

const schema = {
    type: "object",
    properties: {
        cinemaId: {
            type: "number",
            format: "int64",
        },
        offset: {
            type: "number",
            format: "int32",
            minimum: 0,
        },
    },
    required: ["cinemaId", "offset"],
};

module.exports = async () => {
    return {
        handler,
        expectedRoles: [userRoles.GUEST, userRoles.USER, userRoles.ADMIN],
        schema,
    };
};
