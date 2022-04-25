const config = require("config");
const apiGenerator = require("./apiGenerator");
const getSchemaContext = require("../domain/schemas/ajv");
const fastify = require("fastify")({ logger: true });

module.exports = async () => {
    const { ajv } = await getSchemaContext();

    fastify.setValidatorCompiler((opt) => ajv.compile(opt.schema));
    fastify.setErrorHandler((error, request, reply) => {
        reply.code(error.status ?? 500).send({
            message: error.message,
        });
    });
    fastify.register(require("fastify-swagger"), {
        routePrefix: "/documentation",
        swagger: {
            info: {
                title: "Harwex Afisha Resurrected API",
                version: "1.0.0",
            },
            host: "localhost:3000",
            schemes: ["http"],
        },
        exposeRoute: true,
    });
    await apiGenerator(fastify);
    await fastify.listen(config.get("port"));

    fastify.swagger();
};
