const fs = require("fs");
const { userRoles, movieNameStandartRegex } = require("../index").constants;
const getSchemas = require("../index").schemas;
const { mapDelete } = require("../index").mapper;
const { throwBadRequest } = require("../index").exceptions;
const { executeTransaction } = require("../index").connection;
const genericProvider = require("../index").genericProvider;

const handler = async ({ body }) =>
    await executeTransaction(async (transaction) => {
        const rowsDeleted = await genericProvider.delete({
            modelName: "movie",
            id: body.id,
            transaction,
        });
        if (rowsDeleted === 0) {
            throwBadRequest("Such movie doesn't exist");
        }

        const originalDirPath = "./static/movie/" + body.name.replaceAll(movieNameStandartRegex, "");
        await fs.promises.rm(originalDirPath, { recursive: true, force: true });

        return {
            message: "Success",
        };
    });

module.exports = async () => {
    const { movie } = await getSchemas();

    return {
        handler,
        expectedRoles: [userRoles.ADMIN],
        schema: mapDelete(movie),
    };
};
