const sessionService = require("../../services/sessionService");

const schemasOfRequired = {
    getSessionFreeTicketsById: ["id"],
    postSession: ["eventPlaceId", "time", "ticketsAmount"],
    putSession: ["id", "eventPlaceId", "time", "ticketsAmount"],
    deleteSession: ["id"],
};

const schemas = {
    getSessionFreeTicketsById: {
        id: null,
    },
    postSession: {
        eventPlaceId: null,
        time: null,
        ticketsAmount: null,
    },
    putSession: {
        id: null,
        eventPlaceId: null,
        time: null,
        ticketsAmount: null,
    },
    deleteSession: {
        id: null,
    },
};

const getSessions = () => {
    return sessionService.getSessions();
};

const getSessionFreeTicketsById = (model) => {
    return sessionService.getSessionFreeTicketsById(model);
};

const postSession = (model) => {
    return sessionService.insertSession(model);
};

const putSession = (model) => {
    return sessionService.updateSession(model);
};

const deleteSession = (model) => {
    return sessionService.deleteSession(model);
};

module.exports = {
    getSessions,
    getSessionFreeTicketsById,
    putSession,
    postSession,
    deleteSession,
    schemas,
    schemasOfRequired,
};
