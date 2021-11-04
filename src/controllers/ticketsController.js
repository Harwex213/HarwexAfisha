const router = require("express").Router();
const ticketService = require("../services/ticketService");
const { responseOk } = require("./helper/response");
const validateModel = require("./helper/requestBodyValidator");

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

const getTickets = async (request, response, next) => {
    try {
        const model = {
            ...schemas.getTicketsByUserId,
            id: request.params.ticketId,
        };
        console.log("Received model", model);
        validateModel(model, schemasOfRequired.getTicketsByUserId);
        const result = await ticketService.getTicketsByUserId(model);

        responseOk(result, response);
    } catch (e) {
        next(e);
    }
};

const postTicket = async (request, response, next) => {
    try {
        const model = {
            ...schemas.postTicket,
            ...request.body,
        };
        console.log("Received model", model);
        validateModel(model, schemasOfRequired.postTicket);

        const result = await ticketService.insertTicket(model);

        responseOk(result, response);
    } catch (e) {
        next(e);
    }
};

const deleteTicket = async (request, response, next) => {
    try {
        const model = {
            ...schemas.deleteTicket,
            id: request.params.ticketId,
        };
        console.log("Received model", model);
        validateModel(model, schemasOfRequired.deleteTicket);

        const result = await ticketService.deleteTicket(model);

        responseOk(result, response);
    } catch (e) {
        next(e);
    }
};

router.get("/:ticketId", getTickets);
router.post("/", postTicket);
router.delete("/:ticketId", deleteTicket);

module.exports = router;
