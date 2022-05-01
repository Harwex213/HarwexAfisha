const { userRoles } = require("../index").constants;
const getSchemas = require("../index").schemas;
const { map } = require("../index").mapper;
const dataProvider = require("../index").sessionProvider;

const handler = ({ body }) => dataProvider.getSessionAvailableTicketsAmount({ ...body });

module.exports = async () => {
    const { session } = await getSchemas();

    return {
        handler,
        expectedRoles: [userRoles.GUEST, userRoles.USER, userRoles.ADMIN],
        schema: map(session, ["id"], ["id"]),
    };
};
