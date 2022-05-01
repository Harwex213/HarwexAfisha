const { userRoles } = require("../../../constants");
const getSchemas = require("../../schemas/schemas");
const { throwNotFound } = require("../../exceptions");

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
    const schemas = await getSchemas();
    const { schemaName } = body;
    const schema = schemas[schemaName];
    if (!schema) {
        throwNotFound();
    }

    return schema;
};

module.exports = async () => {
    return {
        handler,
        expectedRoles: [userRoles.GUEST, userRoles.USER, userRoles.ADMIN],
        schema,
    };
};
