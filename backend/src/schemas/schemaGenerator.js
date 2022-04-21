const getSequelizeContext = require("../data-access/sequelize");
const { JsonSchemaManager, JsonSchema7Strategy } = require("@alt3/sequelize-to-json-schemas");

let schemas = null;

module.exports = async () => {
    if (schemas) {
        return schemas;
    }

    schemas = {};
    const { models } = await getSequelizeContext();
    const schemaManager = new JsonSchemaManager({
        disableComments: true,
    });

    for (const [key, model] of Object.entries(models)) {
        const schema = schemaManager.generate(model, new JsonSchema7Strategy(), { associations: false });
        delete schema["$schema"];
        delete schema["$id"];
        for (const property of Object.values(schema.properties)) {
            delete property["$id"];
        }
        schemas[key] = schema;
    }

    return schemas;
};
