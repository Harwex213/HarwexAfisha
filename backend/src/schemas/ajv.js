const Ajv = require("ajv");
const addFormats = require("ajv-formats");
const getSchemas = require("./schemaGenerator");

let ajv = null;

module.exports = async () => {
    if (ajv) {
        return ajv;
    }

    ajv = new Ajv();
    addFormats(ajv);

    const schemas = await getSchemas();
    for (const [key, schema] of Object.entries(schemas)) {
        ajv.addSchema(schema, key);
    }

    return ajv;
};
