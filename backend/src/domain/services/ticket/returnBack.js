const { emitter } = require("../index");
const { userRoles } = require("../index").constants;
const getSchemas = require("../index").schemas;
const { mapDelete } = require("../index").mapper;
const { throwBadRequest, throwForbidden } = require("../index").exceptions;
const { executeTransaction } = require("../index").connection;
const genericProvider = require("../index").genericProvider;
const sessionProvider = require("../index").sessionProvider;

const handler = async ({ body, userContext }) =>
    await executeTransaction(async (transaction) => {
        const ticket = await genericProvider.getById({
            modelName: "ticket",
            id: body.id,
            transaction,
        });
        if (ticket.userId !== userContext.id) {
            throwForbidden("Ticket doesn't belong to user");
        }
        const rowsDeleted = await genericProvider.delete({
            modelName: "ticket",
            id: body.id,
            transaction,
        });
        if (rowsDeleted === 0) {
            throwBadRequest("Such ticket order doesn't exist");
        }

        const session = await genericProvider.getById({
            modelName: "session",
            id: ticket.sessionId,
            transaction,
        });
        const [rowsAffected] = await sessionProvider.decrementOrderedTickets({
            id: session.id,
            amount: session.ticketsOrdered,
            transaction,
        });
        if (rowsAffected === 0) {
            throw new Error("decrementOrderedTickets - rows affected zero");
        }

        emitter.emit("ticket/onReturn", ticket);
        return {
            message: "Success",
        };
    });

module.exports = async () => {
    const { ticket } = await getSchemas();

    return {
        handler,
        expectedRoles: [userRoles.USER],
        schema: mapDelete(ticket),
    };
};
