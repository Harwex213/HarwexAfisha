const eventService = require("../../services/eventService");

const schemasOfRequired = {
    postEvent: ["name", "description"],
    putEvent: ["id", "name", "description"],
    deleteEvent: ["id"],
};

const schemas = {
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

const getEvents = () => {
    return eventService.getEvents();
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
    getEvents,
    postEvent,
    putEvent,
    deleteEvent,
    schemas,
    schemasOfRequired,
};
