const eventPlaceDataAccess = require("../dataAccess/eventPlaceDataAccess");
const { checkOnDelete } = require("./helper/checker");

const getEventPlaces = async () => {
    const result = await eventPlaceDataAccess.getEventPlaces();

    return result.recordset;
};

const insertEventPlace = async ({ eventId, placeId }) => {
    const result = await eventPlaceDataAccess.insertEventPlace({ eventId, placeId });

    return {
        id: result.recordset[0].insertedId,
        eventId,
        placeId,
    };
};

const deleteEventPlace = async ({ id }) => {
    const result = await eventPlaceDataAccess.deleteEventPlace({ id });
    checkOnDelete(result);
};

module.exports = {
    getEventPlaces,
    insertEventPlace,
    deleteEventPlace,
};
