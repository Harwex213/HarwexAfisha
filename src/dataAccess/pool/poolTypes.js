const { userRoles, databaseTypes } = require("../../config/constants/db");

const poolTypes = {
    // guest
    getPopularCities: {
        type: databaseTypes.read,
        user: userRoles.guest,
    },
    getCity: {
        type: databaseTypes.read,
        user: userRoles.guest,
    },
    getEventsByDateAndCity: {
        type: databaseTypes.read,
        user: userRoles.guest,
        isPerformance: true,
    },
    getEvent: {
        type: databaseTypes.read,
        user: userRoles.guest,
    },
    getSessionsByDateCityEvent: {
        type: databaseTypes.read,
        user: userRoles.guest,
        isPerformance: true,
    },

    // user
    getTicketsByUserId: {
        type: databaseTypes.read,
        user: userRoles.user,
        isPerformance: true,
    },
    insertTicket: {
        type: databaseTypes.readWrite,
        user: userRoles.user,
    },
    deleteTicket: {
        type: databaseTypes.readWrite,
        user: userRoles.user,
    },

    getSessionFreeTicketsById: {
        type: databaseTypes.read,
        user: userRoles.user,
        isPerformance: true,
    },
    getUserByUsername: {
        type: databaseTypes.read,
        user: userRoles.user,
        isPerformance: true,
    },

    // manager
    insertCity: {
        type: databaseTypes.readWrite,
        user: userRoles.manager,
    },
    updateCity: {
        type: databaseTypes.readWrite,
        user: userRoles.manager,
    },
    deleteCity: {
        type: databaseTypes.readWrite,
        user: userRoles.manager,
    },

    insertEvent: {
        type: databaseTypes.readWrite,
        user: userRoles.manager,
    },
    updateEvent: {
        type: databaseTypes.readWrite,
        user: userRoles.manager,
    },
    deleteEvent: {
        type: databaseTypes.readWrite,
        user: userRoles.manager,
    },

    getEventPlaces: {
        type: databaseTypes.read,
        user: userRoles.manager,
        isPerformance: true,
    },
    insertEventPlace: {
        type: databaseTypes.readWrite,
        user: userRoles.manager,
    },
    deleteEventPlace: {
        type: databaseTypes.readWrite,
        user: userRoles.manager,
    },

    getPlacesChunk: {
        type: databaseTypes.read,
        user: userRoles.manager,
        isPerformance: true,
    },
    insertPlace: {
        type: databaseTypes.readWrite,
        user: userRoles.manager,
    },
    updatePlace: {
        type: databaseTypes.readWrite,
        user: userRoles.manager,
    },
    deletePlace: {
        type: databaseTypes.readWrite,
        user: userRoles.manager,
    },

    insertSession: {
        type: databaseTypes.readWrite,
        user: userRoles.manager,
    },
    updateSession: {
        type: databaseTypes.readWrite,
        user: userRoles.manager,
    },
    deleteSession: {
        type: databaseTypes.readWrite,
        user: userRoles.manager,
    },

    getUsers: {
        type: databaseTypes.read,
        user: userRoles.manager,
    },
    getUserById: {
        type: databaseTypes.read,
        user: userRoles.manager,
    },
    insertUser: {
        type: databaseTypes.readWrite,
        user: userRoles.manager,
    },
    updateUser: {
        type: databaseTypes.readWrite,
        user: userRoles.manager,
    },
    deleteUser: {
        type: databaseTypes.readWrite,
        user: userRoles.manager,
    },
};

module.exports = poolTypes;
