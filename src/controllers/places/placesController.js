const placeService = require("../../services/placeService");

const schemasOfRequired = {
    postPlace: ["name", "about", "cityName"],
    putPlace: ["id", "name", "about", "cityName"],
    deletePlace: ["id"],
};

const schemas = {
    postPlace: {
        name: null,
        about: null,
        cityName: null,
    },
    putPlace: {
        id: null,
        name: null,
        about: null,
        cityName: null,
    },
    deletePlace: {
        id: null,
    },
};

const getPlacesChunk = () => {
    return placeService.getPlacesChunk();
};

const postPlace = async (model) => {
    return placeService.insertPlace(model);
};

const putPlace = async (model) => {
    return placeService.updatePlace(model);
};

const deletePlace = async (model) => {
    return placeService.deletePlace(model);
};

module.exports = {
    getPlacesChunk,
    postPlace,
    putPlace,
    deletePlace,
    schemas,
    schemasOfRequired,
};
