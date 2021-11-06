const placeDataAccess = require("../dataAccess/placeDataAccess");
const { validateOnEntityUpdated, validateOnEntityDelete } = require("./helper/validator");

const getPlaces = async () => {
    const result = await placeDataAccess.getPlaces();

    return result.recordset;
};

const insertPlace = async ({ name, about, cityName }) => {
    const result = await placeDataAccess.insertPlace({ name, about, cityName });

    return {
        id: result.recordset[0].insertedId,
        name,
    };
};

const updatePlace = async ({ id, name, about, cityName }) => {
    const result = await placeDataAccess.updatePlace({ id, name, about, cityName });
    validateOnEntityUpdated(result);

    return {
        id,
        name,
    };
};

const deletePlace = async ({ id }) => {
    const result = await placeDataAccess.deletePlace({ id });
    validateOnEntityDelete(result);

    return "Successfully deleted";
};

module.exports = {
    getPlaces,
    insertPlace,
    updatePlace,
    deletePlace,
};
