const citiesRoutes = require("../controllers/cities/citiesRouter");
const eventsRoutes = require("../controllers/events/eventsRouter");
const placesRoutes = require("../controllers/places/placesRouter");
const eventPlacesRoutes = require("../controllers/eventPlaces/eventPlacesRouter");
const sessionsRoutes = require("../controllers/sessions/sessionsRouter");
const usersRoutes = require("../controllers/users/usersRouter");
const ticketsRoutes = require("../controllers/tickets/ticketsRouter");
const authRoutes = require("../controllers/auth/authRouter");
const cors = require("cors");
const express = require("express");

module.exports = (app) => {
    app.use(
        cors({
            origin: ["http://localhost:5000", "http://localhost:3000"],
        })
    );

    app.use("/static", express.static("static"));
    app.use("/api/auth", authRoutes);
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
