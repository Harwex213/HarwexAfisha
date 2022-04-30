const { userRoles } = require("../../../constants");
const getSchemas = require("../../schemas/schemas");
const { mapCreate } = require("../../schemas/mapper");
const { throwBadRequest } = require("../../exceptions");
const { executeTransaction } = require("../../../data-access/connection");

const handler = async ({ body }) =>
    await executeTransaction(async (transaction) => {
        // TODO: make ordering ticket logic
    });

module.exports = async () => {
    const { ticket } = await getSchemas();

    return {
        handler,
        expectedRoles: [userRoles.GUEST, userRoles.USER, userRoles.ADMIN],
        schema: await mapCreate(ticket),
    };
};
