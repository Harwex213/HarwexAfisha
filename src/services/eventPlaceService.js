const eventPlaceDataAccess = require("../dataAccess/access/eventPlaceDataAccess");
const { validateOnEntityDelete } = require("../dataAccess/util/validator");

const getEventPlaces = async () => {
    const result = await eventPlaceDataAccess.getEventPlaces();

    return result.recordset;
};

const insertEventPlace = async ({ eventId, placeId }) => {
    const result = await eventPlaceDataAccess.insertEventPlace({ eventId, placeId });

    return {
        ...result.recordset[0],
    };
};

const deleteEventPlace = async ({ id }) => {
    const result = await eventPlaceDataAccess.deleteEventPlace({ id });
    validateOnEntityDelete(result);

    return {
        ...result.recordset[0],
    };
};

module.exports = {
    getEventPlaces,
    insertEventPlace,
    deleteEventPlace,
};
