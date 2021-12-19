const cityService = require("../../services/cityService");

const schemasOfRequired = {
    getCity: ["name"],
    postCity: ["name"],
    putCity: ["id", "name"],
    deleteCity: ["id"],
};

const schemas = {
    getCity: {
        name: null,
    },
    postCity: {
        name: null,
        isPopular: null,
    },
    putCity: {
        id: null,
        name: null,
        isPopular: null,
    },
    deleteCity: {
        id: null,
    },
};

const getCitiesChunk = () => {
    return cityService.getCitiesChunk();
};

const getPopularCities = () => {
    return cityService.getPopularCities();
};

const getCity = (model) => {
    return cityService.getCity(model);
};

const postCity = (model) => {
    return cityService.insertCity(model);
};

const putCity = (model) => {
    return cityService.updateCity(model);
};

const deleteCity = (model) => {
    return cityService.deleteCity(model);
};

module.exports = {
    getCitiesChunk,
    getPopularCities,
    getCity,
    postCity,
    putCity,
    deleteCity,
    schemas,
    schemasOfRequired,
};
