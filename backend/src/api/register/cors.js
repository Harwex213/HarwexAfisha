module.exports = async (fastify) => {
    fastify.register(require("@fastify/cors"), {
        origin: "http://localhost:3000",
        methods: ["POST"],
        credentials: true,
    });
};
