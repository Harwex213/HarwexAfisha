const cityService = require("../../services/cityService");

const schemasOfRequired = {
    postCity: ["name"],
    putCity: ["id", "name"],
    deleteCity: ["id"],
};

const schemas = {
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

const getCities = () => {
    return cityService.getCities();
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
    getCities,
    postCity,
    putCity,
    deleteCity,
    schemas,
    schemasOfRequired,
};
