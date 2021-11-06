const cityDataAccess = require("../dataAccess/cityDataAccess");
const { validateOnEntityUpdated, validateOnEntityDelete } = require("./helper/validator");

const getCities = async () => {
    const result = await cityDataAccess.getCities();

    return result.recordset;
};

const insertCity = async ({ name }) => {
    const result = await cityDataAccess.insertCity({ name });

    return {
        id: result.recordset[0].insertedId,
        name,
    };
};

const updateCity = async ({ id, name }) => {
    const result = await cityDataAccess.updateCity({ id, name });
    validateOnEntityUpdated(result);

    return {
        id,
        name,
    };
};

const deleteCity = async ({ id }) => {
    const result = await cityDataAccess.deleteCity({ id });
    validateOnEntityDelete(result);

    return "Successfully deleted";
};

module.exports = {
    getCities,
    insertCity,
    updateCity,
    deleteCity,
};
