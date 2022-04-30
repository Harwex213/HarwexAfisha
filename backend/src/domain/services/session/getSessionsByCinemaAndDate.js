const { userRoles } = require("../../../constants");
const dataProvider = require("../../../data-access/data-providers/sessionProvider");

const schema = {
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
};

const handler = ({ body }) => dataProvider.getSessionsByCinemaAndDate({ ...body });

module.exports = async () => {
    return {
        handler,
        expectedRoles: [userRoles.GUEST, userRoles.USER, userRoles.ADMIN],
        schema,
    };
};
