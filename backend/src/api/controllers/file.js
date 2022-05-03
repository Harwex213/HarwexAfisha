const getPorts = require("../../domain/ports");

module.exports = async (fastify) => {
    const { file } = await getPorts();

    fastify.post(
        "/file/upload",
        {
            schema: {
                tags: ["file"],
                body: file.schema,
            },
        },
        async (request, reply) => {
            const accessToken = request.cookies["accessToken"];
            const parts = request.files();

            return await file.handler({
                accessToken,
                parts,
            });
        }
    );
};
