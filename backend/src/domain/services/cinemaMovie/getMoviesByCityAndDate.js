const dataProvider = require("../index").cinemaMovieProvider;
const { userRoles } = require("../index").constants;

const schema = {
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
};

const handler = ({ body }) => dataProvider.getMoviesByCityAndDate({ ...body });

module.exports = async () => {
    return {
        handler,
        expectedRoles: [userRoles.GUEST, userRoles.USER, userRoles.ADMIN],
        schema,
    };
};
