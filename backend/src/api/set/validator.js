const getSchemaContext = require("../../domain/schemas/ajv");

module.exports = async (fastify) => {
    const { ajv } = await getSchemaContext();

    fastify.setValidatorCompiler((opt) => ajv.compile(opt.schema));
};
