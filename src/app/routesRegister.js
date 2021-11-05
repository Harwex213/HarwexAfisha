const citiesRoutes = require("../controllers/cities/citiesRouter");
const eventsRoutes = require("../controllers/events/eventsRouter");
const placesRoutes = require("../controllers/places/placesRouter");
const eventPlacesRoutes = require("../controllers/eventPlaces/eventPlacesRouter");
const sessionsRoutes = require("../controllers/sessions/sessionsRouter");
const usersRoutes = require("../controllers/users/usersRouter");
const ticketsRoutes = require("../controllers/tickets/ticketsRouter");

module.exports = (app) => {
    app.use("/api/cities", citiesRoutes);
    app.use("/api/events", eventsRoutes);
    app.use("/api/places", placesRoutes);
    app.use("/api/eventPlaces", eventPlacesRoutes);
    app.use("/api/sessions", sessionsRoutes);
    app.use("/api/users", usersRoutes);
    app.use("/api/tickets", ticketsRoutes);

    app.use((request, response, next) => {
        const error = new Error("Unsupported method");
        error.status = 400;
        error.stack = null;
        next(error);
    });
};
