const dataProvider = require("../index").cinemaProvider;
const { userRoles } = require("../index").constants;

const schema = {
    schema: {
        type: "object",
        properties: {
            offset: {
                type: "number",
                format: "int32",
                minimum: 0,
            },
        },
        required: ["offset"],
    },
};

const handler = ({ body }) => dataProvider.getPart({ ...body });

module.exports = async () => {
    return {
        handler,
        expectedRoles: [userRoles.GUEST, userRoles.USER, userRoles.ADMIN],
        schema,
    };
};
