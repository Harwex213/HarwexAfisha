const Ajv = require("ajv");
const addFormats = require("ajv-formats");

module.exports = async (fastify) => {
    const ajv = new Ajv();
    addFormats(ajv);

    fastify.setValidatorCompiler((opt) => ajv.compile(opt.schema));
};
