const cityDataAccess = require("../dataAccess/access/cityDataAccess");
const {
    validateOnEntityUpdated,
    validateOnEntityDelete,
    validateOnEntityWasGet,
} = require("../dataAccess/util/validator");

const getPopularCities = async () => {
    const result = await cityDataAccess.getPopularCities();

    return result.recordset;
};

const getCity = async ({ name }) => {
    const result = await cityDataAccess.getCity({ name });
    validateOnEntityWasGet(result);

    return result.recordset[0];
};

const insertCity = async ({ name }) => {
    const result = await cityDataAccess.insertCity({ name });

    return {
        ...result.recordset[0],
    };
};

const updateCity = async ({ id, name }) => {
    const result = await cityDataAccess.updateCity({ id, name });
    validateOnEntityUpdated(result);

    return {
        ...result.recordset[0],
    };
};

const deleteCity = async ({ id }) => {
    const result = await cityDataAccess.deleteCity({ id });
    validateOnEntityDelete(result);

    return {
        ...result.recordset[0],
    };
};

module.exports = {
    getPopularCities,
    getCity,
    insertCity,
    updateCity,
    deleteCity,
};
