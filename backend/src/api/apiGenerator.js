const getPorts = require("../ports/ports");

module.exports = async (fastify) => {
    const ports = await getPorts();

    for (const [portName, port] of Object.entries(ports)) {
        for (const [methodName, method] of Object.entries(port)) {
            const endpoint = `/${portName}/${methodName}`;

            fastify.post(
                endpoint,
                {
                    schema: {
                        tags: [portName],
                        body: method.schema,
                    },
                },
                async (request, reply) => {
                    const body = request.body;
                    return await method.handler({ body });
                }
            );
        }
    }
};
