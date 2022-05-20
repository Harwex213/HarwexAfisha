module.exports = async (fastify) => {
    fastify.register(require("@fastify/websocket"));
};
