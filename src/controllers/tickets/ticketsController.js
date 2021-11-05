const ticketService = require("../../services/ticketService");

const schemasOfRequired = {
    getTicketsByUserId: ["id"],
    postTicket: ["userId", "sessionId"],
    deleteTicket: ["id"],
};

const schemas = {
    getTicketsByUserId: {
        id: null,
    },
    postTicket: {
        userId: null,
        sessionId: null,
    },
    deleteTicket: {
        id: null,
    },
};

const getTickets = (model) => {
    return ticketService.getTicketsByUserId(model);
};

const postTicket = (model) => {
    return ticketService.insertTicket(model);
};

const deleteTicket = (model) => {
    return ticketService.deleteTicket(model);
};

module.exports = {
    getTickets,
    postTicket,
    deleteTicket,
    schemas,
    schemasOfRequired,
};
