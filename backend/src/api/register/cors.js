const config = require("config").get("cors");
module.exports = async (fastify) => {
    fastify.register(require("@fastify/cors"), {
        origin: config.origin,
        methods: ["POST"],
        credentials: true,
    });
};
