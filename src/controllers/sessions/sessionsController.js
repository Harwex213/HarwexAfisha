const sessionService = require("../../services/sessionService");

const schemasOfRequired = {
    postSession: ["eventPlaceId", "time", "ticketsAmount"],
    putSession: ["id", "eventPlaceId", "time", "ticketsAmount"],
    deleteSession: ["id"],
};

const schemas = {
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
    putSession,
    postSession,
    deleteSession,
    schemas,
    schemasOfRequired,
};
