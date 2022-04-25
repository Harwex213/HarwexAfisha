const config = require("config");
const apiGenerator = require("./apiGenerator");
const getSchemaContext = require("../schemas/ajv");
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
                title: "Test swagger",
                description: "testing the fastify swagger api",
                version: "0.1.0",
            },
            externalDocs: {
                url: "https://swagger.io",
                description: "Find more info here",
            },
            host: "localhost",
            schemes: ["http"],
            consumes: ["application/json"],
            produces: ["application/json"],
            tags: [
                { name: "user", description: "User related end-points" },
                { name: "code", description: "Code related end-points" },
            ],
            definitions: {
                User: {
                    type: "object",
                    required: ["id", "email"],
                    properties: {
                        id: { type: "string", format: "uuid" },
                        firstName: { type: "string" },
                        lastName: { type: "string" },
                        email: { type: "string", format: "email" },
                    },
                },
            },
            securityDefinitions: {
                apiKey: {
                    type: "apiKey",
                    name: "apiKey",
                    in: "header",
                },
            },
        },
        uiConfig: {
            docExpansion: "full",
            deepLinking: false,
        },
        exposeRoute: true,
    });

    await apiGenerator(fastify);

    await fastify.listen(config.get("port"));
    fastify.swagger();
};
