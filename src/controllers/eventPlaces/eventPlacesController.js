const eventPlaceService = require("../../services/eventPlaceService");

const schemasOfRequired = {
    getEventsChunkByPlace: ["placeId"],
    postEventPlace: ["eventId", "placeId"],
    deleteEventPlace: ["id"],
};

const schemas = {
    getEventsChunkByPlace: {
        placeId: null,
    },
    postEventPlace: {
        eventId: null,
        placeId: null,
    },
    deleteEventPlace: {
        id: null,
    },
};

const getEventsChunkByPlace = (model) => {
    return eventPlaceService.getEventsChunkByPlace(model);
};

const postEventPlace = (model) => {
    return eventPlaceService.insertEventPlace(model);
};

const deleteEventPlace = (model) => {
    return eventPlaceService.deleteEventPlace(model);
};

module.exports = {
    getEventsChunkByPlace,
    postEventPlace,
    deleteEventPlace,
    schemas,
    schemasOfRequired,
};
