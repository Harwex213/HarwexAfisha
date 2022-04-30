const dataProvider = require("../../../data-access/data-providers/cinemaMovieProvider");
const { userRoles } = require("../../../constants");

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
