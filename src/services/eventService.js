const eventDataAccess = require("../dataAccess/eventDataAccess");
const { checkOnUpdated, checkOnDelete } = require("./helper/checker");

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
    checkOnUpdated(result);

    return {
        id,
        name,
    };
};

const deleteEvent = async ({ id }) => {
    const result = await eventDataAccess.deleteEvent({ id });
    checkOnDelete(result);
};

module.exports = {
    getEvents,
    insertEvent,
    updateEvent,
    deleteEvent,
};
