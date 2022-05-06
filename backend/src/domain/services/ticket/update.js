const { throwNotFound } = require("../../exceptions");
const { userRoles } = require("../index").constants;
const getSchemas = require("../index").schemas;
const { throwBadRequest } = require("../index").exceptions;
const { executeTransaction } = require("../index").connection;
const genericProvider = require("../index").genericProvider;

const handler = async ({ body }) =>
    await executeTransaction(async (transaction) => {
        const session = await genericProvider.getById({
            modelName: "session",
            id: body.sessionId,
            transaction,
        });
        const hall = await genericProvider.getById({
            modelName: "hall",
            id: session.hallId,
            transaction,
        });

        if (body.row < 0 || body.row > hall.rows) {
            throwBadRequest("Ticket row must be in range of rows of hall");
        }
        if (body.position < 0 || body.position > hall.cols) {
            throwBadRequest("Ticket position must be in range of rows of hall");
        }

        const [rowsAffected] = await genericProvider.update({
            modelName: "ticket",
            instance: body,
        });
        if (rowsAffected === 0) {
            throwNotFound();
        }

        return {
            message: "Success",
        };
    });

module.exports = async () => {
    const { ticket } = await getSchemas();

    return {
        handler,
        expectedRoles: [userRoles.ADMIN],
        schema: ticket,
    };
};
