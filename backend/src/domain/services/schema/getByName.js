const { userRoles } = require("../../../constants");
const getSchemas = require("../../schemas/schemas");
const { throwBadRequest } = require("../../exceptions");

const schema = {
    type: "object",
    properties: {
        schemaName: {
            type: "string",
        },
    },
    required: ["schemaName"],
};

const handler = async ({ body }) => {
    try {
        const { schemas, validateSchemaExisting } = await getSchemas();
        const { schemaName } = body;
        validateSchemaExisting(schemaName);

        return schemas[schemaName];
    } catch (e) {
        throwBadRequest(e.message);
    }
};

module.exports = async () => {
    return {
        handler,
        expectedRoles: [userRoles.GUEST, userRoles.USER, userRoles.ADMIN],
        schema,
    };
};
