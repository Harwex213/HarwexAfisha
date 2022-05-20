module.exports = async (fastify) => {
    fastify.register(require("@fastify/cors"), {
        origin: "https://koa:433",
        methods: ["POST"],
        credentials: true,
    });
};
