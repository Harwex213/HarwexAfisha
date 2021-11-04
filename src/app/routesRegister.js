const citiesRoutes = require("../controllers/citiesController");
const eventsRoutes = require("../controllers/eventsController");
const placesRoutes = require("../controllers/placesController");
const eventPlacesRoutes = require("../controllers/eventPlacesController");
const sessionsRoutes = require("../controllers/sessionsController");
const usersRoutes = require("../controllers/usersController");
const ticketsRoutes = require("../controllers/ticketsController");

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
