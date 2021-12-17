const eventDataAccess = require("../dataAccess/access/eventDataAccess");
const { validateOnEntityUpdated, validateOnEntityDelete } = require("../dataAccess/util/validator");

const getEventsByDateAndCity = async ({ date, city }) => {
    const result = await eventDataAccess.getEventsByDateAndCity({ date, city });

    return result.recordset;
};

const getEvent = async ({ id }) => {
    const result = await eventDataAccess.getEvent({ id });

    return result.recordset[0];
};

const insertEvent = async ({ name, description }) => {
    const result = await eventDataAccess.insertEvent({ name, description });

    return {
        id: result.recordset[0].insertedId,
        name,
    };
};

const updateEvent = async ({ id, name, description }) => {
    const result = await eventDataAccess.updateEvent({ id, name, description });
    validateOnEntityUpdated(result);

    return {
        id,
        name,
    };
};

const deleteEvent = async ({ id }) => {
    const result = await eventDataAccess.deleteEvent({ id });
    validateOnEntityDelete(result);

    return "Successfully deleted";
};

module.exports = {
    getEventsByDateAndCity,
    getEvent,
    insertEvent,
    updateEvent,
    deleteEvent,
};
