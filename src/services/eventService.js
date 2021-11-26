const eventDataAccess = require("../dataAccess/access/eventDataAccess");
const { validateOnEntityUpdated, validateOnEntityDelete } = require("../dataAccess/util/validator");

const getEvents = async () => {
    const result = await eventDataAccess.getEvents();

    return result.recordset;
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
    getEvents,
    insertEvent,
    updateEvent,
    deleteEvent,
};
