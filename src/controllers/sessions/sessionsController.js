const sessionService = require("../../services/sessionService");

const schemasOfRequired = {
    getSessionsByDateCityEvent: ["date", "city", "eventId"],
    getSessionFreeTicketsById: ["id"],
    postSession: ["eventPlaceId", "time", "ticketsAmount"],
    putSession: ["id", "eventPlaceId", "time", "ticketsAmount"],
    deleteSession: ["id"],
};

const schemas = {
    getSessionsByDateCityEvent: {
        date: null,
        city: null,
        eventId: null,
    },
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

const getSessionsByDateCityEvent = (model) => {
    return sessionService.getSessionsByDateCityEvent(model);
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
    getSessionsByDateCityEvent,
    getSessionFreeTicketsById,
    putSession,
    postSession,
    deleteSession,
    schemas,
    schemasOfRequired,
};
