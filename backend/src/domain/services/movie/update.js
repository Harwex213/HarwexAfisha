const { userRoles, movieNameStandartRegex } = require("../index").constants;
const getSchemas = require("../index").schemas;
const genericProvider = require("../index").genericProvider;
const fs = require("fs");
const { connection } = require("../index");
const { throwNotFound } = require("../../exceptions");

const handler = async ({ body }) =>
    connection.executeTransaction(async (transaction) => {
        const movie = await genericProvider.getById({
            modelName: "movie",
            id: body.id,
            transaction,
        });
        const [rowsAffected] = await genericProvider.update({
            modelName: "movie",
            instance: body,
            transaction,
        });
        if (rowsAffected === 0) {
            throwNotFound();
        }

        if (movie.name !== body.name) {
            const originalDirPath = "./static/movie/" + movie.name.replaceAll(movieNameStandartRegex, "");
            const newDirPath = "./static/movie/" + body.name.replaceAll(movieNameStandartRegex, "");
            await fs.promises.rename(originalDirPath, newDirPath);
        }

        return movie;
    });

module.exports = async () => {
    const { movie } = await getSchemas();

    return {
        handler,
        expectedRoles: [userRoles.ADMIN],
        schema: movie,
    };
};
