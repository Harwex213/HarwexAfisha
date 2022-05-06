const { userRoles } = require("../index").constants;
const getSchemas = require("../index").schemas;
const { mapCreate } = require("../index").mapper;
const genericProvider = require("../index").genericProvider;
const fs = require("fs");
const { connection } = require("../index");

const handler = async ({ body }) =>
    connection.executeTransaction(async (transaction) => {
        const movie = await genericProvider.create({
            modelName: "movie",
            instance: body,
            transaction,
        });

        const dirPath = "./static/movie/" + movie.id;
        await fs.promises.mkdir(dirPath, { recursive: true });

        return movie;
    });

module.exports = async () => {
    const { movie } = await getSchemas();

    return {
        handler,
        expectedRoles: [userRoles.ADMIN],
        schema: await mapCreate(movie),
    };
};
