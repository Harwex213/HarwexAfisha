const cityDataAccess = require("../dataAccess/cityDataAccess");
const { checkOnUpdated, checkOnDelete } = require("./helper/checker");

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
    checkOnUpdated(result);

    return {
        id,
        name,
    };
};

const deleteCity = async ({ id }) => {
    const result = await cityDataAccess.deleteCity({ id });
    checkOnDelete(result);
};

module.exports = {
    getCities,
    insertCity,
    updateCity,
    deleteCity,
};
