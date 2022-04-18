const sessionDataProvider = require("../data-access/data-providers/sessionProvider");

module.exports.getSessionsByCinemaAndDate = sessionDataProvider.getSessionsByCinemaAndDate;

module.exports.getSessionAvailableTicketsAmount = sessionDataProvider.getSessionAvailableTicketsAmount;
