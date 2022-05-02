const fs = require("fs");
const util = require("util");
const { pipeline } = require("stream");
const pump = util.promisify(pipeline);

module.exports = async (fastify) => {
    fastify.post(
        "/file/upload",
        {
            schema: {
                tags: ["file"],
            },
        },
        async (request, reply) => {
            const data = await request.file();
            await pump(data.file, fs.createWriteStream("./static/" + data.fieldname));
            reply.send();
        }
    );
};
