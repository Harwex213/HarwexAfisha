const { userRoles } = require("../index").constants;
const dataProvider = require("../index").sessionProvider;

const schema = {
    type: "object",
    properties: {
        cinemaId: {
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
    required: ["cinemaId", "movieId", "date"],
};

const handler = ({ body }) => dataProvider.getSessionsByCinemaDateMovie({ ...body });

module.exports = async () => {
    return {
        handler,
        expectedRoles: [userRoles.GUEST, userRoles.USER, userRoles.ADMIN],
        schema,
    };
};
