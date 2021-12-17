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
    },
    putCity: {
        id: null,
        name: null,
    },
    deleteCity: {
        id: null,
    },
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
    getPopularCities,
    getCity,
    postCity,
    putCity,
    deleteCity,
    schemas,
    schemasOfRequired,
};
