const { userRoles } = require("../index").constants;
const dataProvider = require("../index").sessionProvider;

const schema = {
    type: "object",
    properties: {
        sessionId: {
            type: "number",
            format: "int64",
        },
    },
    required: ["sessionId"],
};

const handler = ({ body }) => dataProvider.getSessionOrderedSeats({ ...body });

module.exports = async () => {
    return {
        handler,
        expectedRoles: [userRoles.GUEST, userRoles.USER, userRoles.ADMIN],
        schema,
    };
};
