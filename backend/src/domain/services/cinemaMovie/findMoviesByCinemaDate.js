const dataProvider = require("../index").cinemaMovieProvider;
const { userRoles } = require("../index").constants;

const handler = ({ body }) => dataProvider.findMoviesByCinemaDate({ ...body });

const schema = {
    type: "object",
    properties: {
        name: {
            type: "string",
        },
        cinemaId: {
            type: "number",
            format: "int64",
        },
        date: {
            type: "string",
            format: "date",
        },
    },
    required: ["cinemaId", "date"],
};

module.exports = async () => {
    return {
        handler,
        expectedRoles: [userRoles.GUEST, userRoles.USER, userRoles.ADMIN],
        schema,
    };
};
