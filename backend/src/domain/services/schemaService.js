const getSchemasContext = require("../schemas/ajv");
const { userRoles } = require("../../constants");
const { throwBadRequest } = require("../exceptions");

const schemas = {
    getNames: {},
    getByName: {
        type: "object",
        properties: {
            schemaName: {
                type: "string",
            },
        },
        required: ["schemaName"],
    },
};

module.exports.getNames = {
    handler: async () => {
        const { schemas } = await getSchemasContext();
        return Object.keys(schemas);
    },
    expectedRoles: [userRoles.GUEST, userRoles.USER, userRoles.ADMIN],
    schema: schemas.getNames,
};

module.exports.getByName = {
    handler: async ({ body }) => {
        try {
            const { schemas, validateSchemaExisting } = await getSchemasContext();
            const { schemaName } = body;
            validateSchemaExisting(schemaName);

            return schemas[schemaName];
        } catch (e) {
            throwBadRequest(e.message);
        }
    },
    expectedRoles: [userRoles.GUEST, userRoles.USER, userRoles.ADMIN],
    schema: schemas.getByName,
};
