const { emitter } = require("../index");
const { userRoles } = require("../index").constants;
const getSchemas = require("../index").schemas;
const { mapCreate } = require("../index").mapper;
const { throwBadRequest } = require("../index").exceptions;
const { executeTransaction } = require("../index").connection;
const genericProvider = require("../index").genericProvider;
const sessionProvider = require("../index").sessionProvider;

const handler = async ({ body, userContext }) =>
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

        const maxTicketsAmount = hall.rows * hall.cols;
        if (session.ticketsOrdered === maxTicketsAmount) {
            throwBadRequest("All tickets ordered");
        }
        if (body.row < 0 || body.row > hall.rows) {
            throwBadRequest("Ticket row must be in range of rows of hall");
        }
        if (body.position < 0 || body.position > hall.cols) {
            throwBadRequest("Ticket position must be in range of rows of hall");
        }

        const [rowsAffected] = await sessionProvider.incrementOrderedTickets({
            id: session.id,
            amount: session.ticketsOrdered,
            transaction,
        });
        if (rowsAffected === 0) {
            throw new Error("incrementOrderedTickets - rows affected zero");
        }

        try {
            const ticket = await genericProvider.create({
                modelName: "ticket",
                instance: {
                    ...body,
                    userId: userContext.id,
                },
                transaction,
            });
            emitter.emit("ticket/onOrder", ticket);

            return ticket;
        } catch (e) {
            throwBadRequest("Ticket to this session with such row and position already ordered");
        }
    });

module.exports = async () => {
    const { ticket } = await getSchemas();

    return {
        handler,
        expectedRoles: [userRoles.USER],
        schema: await mapCreate(ticket),
    };
};
