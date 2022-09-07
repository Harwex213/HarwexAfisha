module.exports = async (fastify) => {
    fastify.setErrorHandler((error, request, reply) => {
        reply.code(error.status ?? 500).send({
            message: error.message,
        });
    });
};
