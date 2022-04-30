const { userRoles } = require("../../../constants");
const getSchemas = require("../../schemas/schemas");
const { map } = require("../../schemas/mapper");
const dataProvider = require("../../../data-access/data-providers/sessionProvider");

const handler = ({ body }) => dataProvider.getSessionAvailableTicketsAmount({ ...body });

module.exports = async () => {
    const { session } = await getSchemas();

    return {
        handler,
        expectedRoles: [userRoles.GUEST, userRoles.USER, userRoles.ADMIN],
        schema: map(session, ["id"], ["id"]),
    };
};
