const dataProvider = require("../index").cityProvider;
const { userRoles } = require("../index").constants;

const schema = {
    type: "object",
    properties: {
        city: {
            type: "string",
            maxLength: 50,
        },
    },
};

const handler = ({ body }) => dataProvider.find({ cityName: body.city });

module.exports = async () => {
    return {
        handler,
        expectedRoles: [userRoles.GUEST, userRoles.USER, userRoles.ADMIN],
        schema,
    };
};
