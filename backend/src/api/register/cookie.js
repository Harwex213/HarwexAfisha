module.exports = async (fastify) => {
    fastify.register(require("@fastify/cookie"), {
        secret: "super-secret-cookie",
        parseOptions: {},
    });
};
