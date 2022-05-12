const { userRoles } = require("../index").constants;
const dataProvider = require("../index").ticketProvider;

const schema = {
    type: "object",
    properties: {
        userId: {
            type: "number",
            format: "int64",
        },
        offset: {
            type: "number",
            format: "int32",
        },
        thresholdDate: {
            type: "string",
            format: "date",
        },
        isBefore: {
            type: "boolean",
        },
    },
    required: ["userId", "offset", "thresholdDate"],
};

const handler = ({ body }) => dataProvider.getUserTickets({ ...body });

module.exports = async () => {
    return {
        handler,
        expectedRoles: [userRoles.GUEST, userRoles.USER, userRoles.ADMIN],
        schema,
    };
};
