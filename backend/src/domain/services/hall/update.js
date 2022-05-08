const { throwNotFound } = require("../../exceptions");
const { ticketProvider } = require("../index");
const { userRoles } = require("../index").constants;
const getSchemas = require("../index").schemas;
const genericProvider = require("../index").genericProvider;

const handler = async ({ body }) => {
    const [rowsAffected] = await genericProvider.update({
        modelName: "hall",
        instance: body,
    });
    if (rowsAffected === 0) {
        throwNotFound();
    }

    await ticketProvider.deleteAllByThresholdRowPosition({
        hallId: body.id,
        row: body.rows,
        position: body.cols,
    });

    return {
        message: "Success",
    };
};

module.exports = async () => {
    const { hall } = await getSchemas();

    return {
        handler,
        expectedRoles: [userRoles.ADMIN],
        schema: hall,
    };
};
