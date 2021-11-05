const eventPlaceService = require("../../services/eventPlaceService");

const schemasOfRequired = {
    postEventPlace: ["eventId", "placeId"],
    deleteEventPlace: ["id"],
};

const schemas = {
    postEventPlace: {
        eventId: null,
        placeId: null,
    },
    deleteEventPlace: {
        id: null,
    },
};

const getEventPlaces = () => {
    return eventPlaceService.getEventPlaces();
};

const postEventPlace = (model) => {
    return eventPlaceService.insertEventPlace(model);
};

const deleteEventPlace = (model) => {
    return eventPlaceService.deleteEventPlace(model);
};

module.exports = {
    getEventPlaces,
    postEventPlace,
    deleteEventPlace,
    schemas,
    schemasOfRequired,
};
