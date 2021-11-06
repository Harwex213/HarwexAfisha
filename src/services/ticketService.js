const ticketDataAccess = require("../dataAccess/ticketDataAccess");
const { validateOnEntityDelete } = require("./helper/validator");

const getTicketsByUserId = async ({ id }) => {
    const result = await ticketDataAccess.getTicketsByUserId({ id });

    return result.recordset;
};

const insertTicket = async ({ userId, sessionId }) => {
    const result = await ticketDataAccess.insertTicket({ userId, sessionId });

    return {
        id: result.recordset[0].insertedId,
        userId,
        sessionId,
    };
};

const deleteTicket = async ({ id, userId }) => {
    const result = await ticketDataAccess.deleteTicket({ id, userId });
    validateOnEntityDelete(result);
};

module.exports = {
    getTicketsByUserId,
    insertTicket,
    deleteTicket,
};
