const path = require("path");

module.exports = async (fastify) => {
    fastify.register(require("@fastify/static"), {
        root: path.join(__dirname, "../../../static"),
        prefix: "/static/",
    });
};
