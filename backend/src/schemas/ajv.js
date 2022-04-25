const Ajv = require("ajv");
const addFormats = require("ajv-formats");
const getSchemas = require("./schemaGenerator");

let ajv = null;
let schemas = null;

const validateSchemaExisting = (schemaName) => {
    const schema = schemas[schemaName];
    if (!schema) {
        throw new Error("Undefined schema");
    }
};

const validateSchema = (schema, instance = {}) => {
    if (typeof schema === "string") {
        validateSchemaExisting(schema);
    }

    if (!ajv.validate(schema, instance)) {
        throw new Error(ajv.errorsText());
    }
};

module.exports = async () => {
    if (ajv) {
        return {
            ajv,
            schemas,
            validateSchema,
            validateSchemaExisting,
        };
    }

    ajv = new Ajv();
    addFormats(ajv);

    schemas = await getSchemas();
    for (const [key, schema] of Object.entries(schemas)) {
        ajv.addSchema(schema, key);
    }

    return {
        ajv,
        schemas,
        validateSchema,
        validateSchemaExisting,
    };
};
