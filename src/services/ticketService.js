const ticketDataAccess = require("../dataAccess/access/ticketDataAccess");
const { validateOnEntityDelete } = require("../dataAccess/util/validator");

const getTicketsByUserId = async ({ id }) => {
    const result = await ticketDataAccess.getTicketsByUserId({ id });

    return result.recordset;
};

const insertTicket = async ({ userId, sessionId }) => {
    const result = await ticketDataAccess.insertTicket({ userId, sessionId });

    return {
        ...result.recordset[0],
    };
};

const deleteTicket = async ({ id, userId }) => {
    const result = await ticketDataAccess.deleteTicket({ id, userId });
    validateOnEntityDelete(result);

    return {
        ...result.recordset[0],
    };
};

module.exports = {
    getTicketsByUserId,
    insertTicket,
    deleteTicket,
};
