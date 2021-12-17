const eventService = require("../../services/eventService");

const schemasOfRequired = {
    getEventsByDateAndCity: ["date", "cityId"],
    getEvent: ["id"],
    postEvent: ["name", "description"],
    putEvent: ["id", "name", "description"],
    deleteEvent: ["id"],
};

const schemas = {
    getEventsByDateAndCity: {
        date: null,
        cityId: null,
    },
    getEvent: {
        id: null,
    },
    postEvent: {
        name: null,
        description: null,
    },
    putEvent: {
        id: null,
        name: null,
        description: null,
    },
    deleteEvent: {
        id: null,
    },
};

const getEventsByDateAndCity = (model) => {
    return eventService.getEventsByDateAndCity(model);
};

const getEvent = (model) => {
    return eventService.getEvent(model);
};

const postEvent = (model) => {
    return eventService.insertEvent(model);
};

const putEvent = (model) => {
    return eventService.updateEvent(model);
};

const deleteEvent = (model) => {
    return eventService.deleteEvent(model);
};

module.exports = {
    getEventsByDateAndCity,
    getEvent,
    postEvent,
    putEvent,
    deleteEvent,
    schemas,
    schemasOfRequired,
};
