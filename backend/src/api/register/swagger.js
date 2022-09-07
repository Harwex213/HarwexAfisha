module.exports = async (fastify) => {
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
};
