const { userRoles } = require("../index").constants;
const dataProvider = require("../index").sessionProvider;

const schema = {
    type: "object",
    properties: {
        hallId: {
            type: "number",
            format: "int64",
        },
        date: {
            type: "string",
            format: "date",
        },
        includeMovie: {
            type: "boolean",
        },
    },
    required: ["hallId", "date"],
};

const handler = ({ body }) => dataProvider.getSessionsByHallAndDate({ ...body });

module.exports = async () => {
    return {
        handler,
        expectedRoles: [userRoles.GUEST, userRoles.USER, userRoles.ADMIN],
        schema,
    };
};
