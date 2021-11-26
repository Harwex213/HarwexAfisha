const sessionDataAccess = require("../dataAccess/access/sessionDataAccess");
const {
    validateOnEntityWasGet,
    validateOnEntityUpdated,
    validateOnEntityDelete,
} = require("../dataAccess/util/validator");

const getSessions = async () => {
    const result = await sessionDataAccess.getSessions();

    return result.recordset;
};

const getSessionFreeTicketsById = async ({ id }) => {
    const result = await sessionDataAccess.getSessionFreeTicketsById({ id });
    validateOnEntityWasGet(result, "Not found entity with such id");

    return result.recordset[0];
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
    validateOnEntityUpdated(result);

    return {
        id,
        eventPlaceId,
        time,
        ticketsAmount,
    };
};

const deleteSession = async ({ id }) => {
    const result = await sessionDataAccess.deleteSession({ id });
    validateOnEntityDelete(result);

    return "Successfully deleted";
};

module.exports = {
    getSessions,
    getSessionFreeTicketsById,
    insertSession,
    updateSession,
    deleteSession,
};
