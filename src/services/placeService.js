const placeDataAccess = require("../dataAccess/placeDataAccess");
const { checkOnUpdated, checkOnDelete } = require("./helper/checker");

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
    checkOnUpdated(result);

    return {
        id,
        name,
    };
};

const deletePlace = async ({ id }) => {
    const result = await placeDataAccess.deletePlace({ id });
    checkOnDelete(result);
};

module.exports = {
    getPlaces,
    insertPlace,
    updatePlace,
    deletePlace,
};
