const config = require("config");
const apiGenerator = require("./apiGenerator");
const fs = require("fs/promises");

const toInclude = ["set", "register", "controllers"];

const includeModules = async (fastify) => {
    for (const pathName of toInclude) {
        const modules = await fs.readdir(`./src/api/${pathName}`);
        for (const module of modules) {
            await require(`./${pathName}/${module}`)(fastify);
        }
    }
};

module.exports = async () => {
    const fastify = require("fastify")({
        logger: true,
        https: {
            key: await fs.readFile("./config/harwex-tickets.key"),
            cert: await fs.readFile("./config/harwex-tickets.crt"),
        },
    });

    await includeModules(fastify);
    await apiGenerator(fastify);
    await fastify.listen(config.get("port"));

    fastify.swagger();
};
