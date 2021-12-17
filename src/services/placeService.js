const placeDataAccess = require("../dataAccess/access/placeDataAccess");
const { validateOnEntityUpdated, validateOnEntityDelete } = require("../dataAccess/util/validator");

const getPlacesChunk = async () => {
    const result = await placeDataAccess.getPlacesChunk();

    return result.recordset;
};

const insertPlace = async ({ name, about, cityId }) => {
    const result = await placeDataAccess.insertPlace({ name, about, cityId });

    return {
        ...result.recordset[0],
    };
};

const updatePlace = async ({ id, name, about, cityId }) => {
    const result = await placeDataAccess.updatePlace({ id, name, about, cityId });
    validateOnEntityUpdated(result);

    return {
        ...result.recordset[0],
    };
};

const deletePlace = async ({ id }) => {
    const result = await placeDataAccess.deletePlace({ id });
    validateOnEntityDelete(result);

    return {
        ...result.recordset[0],
    };
};

module.exports = {
    getPlacesChunk,
    insertPlace,
    updatePlace,
    deletePlace,
};
