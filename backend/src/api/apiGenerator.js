const getPorts = require("../domain/ports");

const setCookie = (reply) => (key, value, options) => {
    reply.setCookie(key, value, {
        ...options,
    });
};

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
                    const accessToken = request.cookies["accessToken"];
                    const refreshToken = request.cookies["refreshToken"];

                    return await method.handler({
                        body,
                        accessToken,
                        refreshToken,
                        setCookie: setCookie(reply),
                    });
                }
            );
        }
    }
};
