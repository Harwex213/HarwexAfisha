const ticketDataAccess = require("../dataAccess/ticketDataAccess");
const { checkOnEntityFound } = require("./helper/checker");

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

const deleteTicket = async ({ id }) => {
    const result = await ticketDataAccess.deleteTicket({ id });
    checkOnEntityFound(result);
};

module.exports = {
    getTicketsByUserId,
    insertTicket,
    deleteTicket,
};
