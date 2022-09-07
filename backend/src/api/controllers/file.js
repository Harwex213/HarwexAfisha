const getPorts = require("../../domain/ports");

module.exports = async (fastify) => {
    const { file } = await getPorts();
    const { upload } = file;

    fastify.post(
        "/api/file/upload",
        {
            schema: {
                tags: ["file"],
            },
        },
        async (request, reply) => {
            const accessToken = request.cookies["accessToken"];
            const file = await request.file();

            return await upload.handler({
                accessToken,
                file,
            });
        }
    );
};
