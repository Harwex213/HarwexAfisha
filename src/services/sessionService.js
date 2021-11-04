const sessionDataAccess = require("../dataAccess/sessionDataAccess");
const { checkOnUpdated, checkOnDelete } = require("./helper/checker");

const getSessions = async () => {
    const result = await sessionDataAccess.getSessions();

    return result.recordset;
};

const insertSession = async ({ eventPlaceId, time, ticketsAmount }) => {
    const result = await sessionDataAccess.insertSession({ eventPlaceId, time, ticketsAmount });

    return {
        id: result.recordset[0].insertedId,
        eventPlaceId,
        time,
        ticketsAmount,
    };
};

const updateSession = async ({ id, eventPlaceId, time, ticketsAmount }) => {
    const result = await sessionDataAccess.updateSession({ id, eventPlaceId, time, ticketsAmount });
    checkOnUpdated(result);

    return {
        id,
        eventPlaceId,
        time,
        ticketsAmount,
    };
};

const deleteSession = async ({ id }) => {
    const result = await sessionDataAccess.deleteSession({ id });
    checkOnDelete(result);
};

module.exports = {
    getSessions,
    insertSession,
    updateSession,
    deleteSession,
};
