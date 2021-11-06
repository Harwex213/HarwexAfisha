const ticketService = require("../../services/ticketService");
const jwtService = require("../../services/jwtService");
const accessTokenFromRequest = require("../../util/jwt/accessTokenFromRequest");

const schemasOfRequired = {
    postTicket: ["sessionId"],
    deleteTicket: ["id"],
};

const schemas = {
    postTicket: {
        sessionId: null,
    },
    deleteTicket: {
        id: null,
    },
};

const getTickets = (request) => {
    const accessToken = accessTokenFromRequest(request);
    const decoded = jwtService.decodeAccessToken(accessToken);
    const model = {
        id: decoded.payload.id,
    };

    return ticketService.getTicketsByUserId(model);
};

const postTicket = ({ sessionId }, request) => {
    const accessToken = accessTokenFromRequest(request);
    const decoded = jwtService.decodeAccessToken(accessToken);
    const model = {
        userId: decoded.payload.id,
        sessionId,
    };

    return ticketService.insertTicket(model);
};

const deleteTicket = ({ id }, request) => {
    const accessToken = accessTokenFromRequest(request);
    const decoded = jwtService.decodeAccessToken(accessToken);
    const model = {
        id,
        userId: decoded.payload.id,
    };

    return ticketService.deleteTicket(model);
};

module.exports = {
    getTickets,
    postTicket,
    deleteTicket,
    schemas,
    schemasOfRequired,
};
