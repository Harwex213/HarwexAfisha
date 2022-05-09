var DataTypes = require("sequelize").DataTypes;
var _cinema = require("./cinema");
var _cinemaMovie = require("./cinemaMovie");
var _city = require("./city");
var _hall = require("./hall");
var _movie = require("./movie");
var _refreshToken = require("./refreshToken");
var _session = require("./session");
var _ticket = require("./ticket");
var _user = require("./user");
var _userRole = require("./userRole");

function initModels(sequelize) {
    var cinema = _cinema(sequelize, DataTypes);
    var cinemaMovie = _cinemaMovie(sequelize, DataTypes);
    var city = _city(sequelize, DataTypes);
    var hall = _hall(sequelize, DataTypes);
    var movie = _movie(sequelize, DataTypes);
    var refreshToken = _refreshToken(sequelize, DataTypes);
    var session = _session(sequelize, DataTypes);
    var ticket = _ticket(sequelize, DataTypes);
    var user = _user(sequelize, DataTypes);
    var userRole = _userRole(sequelize, DataTypes);

    cinemaMovie.belongsTo(cinema, { as: "cinema", foreignKey: "cinemaId" });
    cinema.hasMany(cinemaMovie, { as: "cinemaMovies", foreignKey: "cinemaId" });
    hall.belongsTo(cinema, { as: "cinema", foreignKey: "cinemaId" });
    cinema.hasMany(hall, { as: "halls", foreignKey: "cinemaId" });
    session.belongsTo(cinemaMovie, { as: "cinemaMovie", foreignKey: "cinemaMovieId" });
    cinemaMovie.hasMany(session, { as: "sessions", foreignKey: "cinemaMovieId" });
    cinema.belongsTo(city, { as: "city", foreignKey: "cityId" });
    city.hasMany(cinema, { as: "cinemas", foreignKey: "cityId" });
    session.belongsTo(hall, { as: "hall", foreignKey: "hallId" });
    hall.hasMany(session, { as: "sessions", foreignKey: "hallId" });
    cinemaMovie.belongsTo(movie, { as: "movie", foreignKey: "movieId" });
    movie.hasMany(cinemaMovie, { as: "cinemaMovies", foreignKey: "movieId" });
    ticket.belongsTo(session, { as: "session", foreignKey: "sessionId" });
    session.hasMany(ticket, { as: "tickets", foreignKey: "sessionId" });
    ticket.belongsTo(user, { as: "user", foreignKey: "userId" });
    user.hasMany(ticket, { as: "tickets", foreignKey: "userId" });
    user.belongsTo(userRole, { as: "role", foreignKey: "roleId" });
    userRole.hasMany(user, { as: "users", foreignKey: "roleId" });

    return {
        cinema,
        cinemaMovie,
        city,
        hall,
        movie,
        refreshToken,
        session,
        ticket,
        user,
        userRole,
    };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
