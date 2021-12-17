const sessionDataAccess = require("../dataAccess/access/sessionDataAccess");
const {
    validateOnEntityWasGet,
    validateOnEntityUpdated,
    validateOnEntityDelete,
} = require("../dataAccess/util/validator");

const getSessionsByDateCityEvent = async ({ date, city, eventId }) => {
    const groupBy = (data, key) => {
        return Object.values(
            data.reduce((previous, current) => {
                (previous[current[key]] = previous[current[key]] || {
                    placeId: current.placeId,
                    placeName: current.placeName,
                    sessions: [],
                }).sessions.push({
                    id: current.id,
                    time: current.time,
                    price: current.price,
                    freeTickets: current.freeTickets,
                });
                return previous;
            }, {})
        );
    };

    const result = await sessionDataAccess.getSessionsByDateCityEvent({ date, city, eventId });
    return groupBy(result.recordset, "placeId");
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
    getSessionsByDateCityEvent,
    getSessionFreeTicketsById,
    insertSession,
    updateSession,
    deleteSession,
};
