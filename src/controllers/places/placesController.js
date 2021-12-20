const placeService = require("../../services/placeService");

const schemasOfRequired = {
    getPlacesChunk: ["cityId"],
    postPlace: ["name", "about", "cityId"],
    putPlace: ["id", "name", "about", "cityId"],
    deletePlace: ["id"],
};

const schemas = {
    getPlacesChunk: {
        cityId: null,
    },
    postPlace: {
        name: null,
        about: null,
        cityId: null,
    },
    putPlace: {
        id: null,
        name: null,
        about: null,
        cityId: null,
    },
    deletePlace: {
        id: null,
    },
};

const getPlacesChunk = (model) => {
    return placeService.getPlacesChunk(model);
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
