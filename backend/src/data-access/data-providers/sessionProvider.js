const { getNextDay } = require("../../helpers/time");
const { Op } = require("sequelize");
const getContext = require("../sequelize");

module.exports.getSessionsByCinemaAndDate = async ({
    cinemaId,
    date,
    includeMovie = false,
    transaction = null,
}) => {
    const { models } = await getContext();
    const { session, movie, cinemaMovie } = models;

    const sessions = await session.findAll({
        where: {
            time: { [Op.between]: [date, getNextDay(date)] },
        },
        include: [
            {
                model: cinemaMovie,
                as: "cinemaMovie",
                where: { cinemaId: cinemaId },
                attributes: [],
                include: includeMovie
                    ? [
                          {
                              model: movie,
                              as: "movie",
                              attributes: ["id", "name"],
                          },
                      ]
                    : [],
            },
        ],
        transaction,
        raw: true,
        nest: true,
    });

    for (const _session of sessions) {
        _session.movieId = _session.cinemaMovie.movie.id;
        _session.movieName = _session.cinemaMovie.movie.name;
        delete _session.cinemaMovie;
    }

    return sessions;
};

module.exports.getSessionsByCinemaDateMovie = async ({ cinemaId, movieId, date, transaction = null }) => {
    const { models } = await getContext();
    const { session, hall, cinemaMovie } = models;

    const sessions = await session.findAll({
        where: {
            time: { [Op.between]: [date, getNextDay(date)] },
        },
        include: [
            {
                model: cinemaMovie,
                as: "cinemaMovie",
                where: {
                    [Op.and]: {
                        cinemaId: cinemaId,
                        movieId: movieId,
                    },
                },
                attributes: [],
            },
            {
                model: hall,
                as: "hall",
                attributes: ["cols", "rows"],
            },
        ],
        order: [["time", "ASC"]],
        transaction,
        raw: true,
        nest: true,
    });

    for (const _session of sessions) {
        _session.isAllTicketsOrdered = _session.hall.rows * _session.hall.cols === _session.ticketsOrdered;
        delete _session.hall;
        delete _session.ticketsOrdered;
    }

    return sessions;
};

module.exports.getSessionsByHallAndDate = async ({
    hallId,
    date,
    includeMovie = false,
    transaction = null,
}) => {
    const { models } = await getContext();
    const { session, movie, cinemaMovie } = models;

    const sessions = await session.findAll({
        where: {
            time: { [Op.between]: [date, getNextDay(date)] },
            hallId,
        },
        include: [
            {
                model: cinemaMovie,
                as: "cinemaMovie",
                attributes: [],
                include: includeMovie
                    ? [
                          {
                              model: movie,
                              as: "movie",
                              attributes: ["id", "name"],
                          },
                      ]
                    : [],
            },
        ],
        transaction,
        raw: true,
        nest: true,
    });

    if (includeMovie) {
        for (const _session of sessions) {
            if (!_session.cinemaMovie) {
                continue;
            }
            _session.movieId = _session.cinemaMovie.movie.id;
            _session.movieName = _session.cinemaMovie.movie.name;
            delete _session.cinemaMovie;
        }
    }

    return sessions;
};

module.exports.getSessionOrderedSeats = async ({ sessionId, transaction = null }) => {
    const { models } = await getContext();
    const { ticket } = models;

    const sessions = await ticket.findAll({
        attributes: ["row", "position"],
        where: { sessionId },
        transaction,
        raw: true,
        nest: true,
    });

    return sessions.map((session) => [session.row, session.position]);
};

module.exports.incrementOrderedTickets = async ({ id, amount, transaction = null }) => {
    const { models } = await getContext();
    const { session } = models;

    return await session.update(
        { ticketsOrdered: amount + 1 },
        {
            where: {
                id,
            },
            transaction,
            raw: true,
            nest: true,
        }
    );
};

module.exports.decrementOrderedTickets = async ({ id, amount, transaction = null }) => {
    if (amount === 0) {
        throw new Error("decrementOrderedTickets - amount was received zero");
    }

    const { models } = await getContext();
    const { session } = models;

    return await session.update(
        { ticketsOrdered: amount - 1 },
        {
            where: {
                id,
            },
            transaction,
            raw: true,
            nest: true,
        }
    );
};

module.exports.deleteAllByThresholdDate = async ({ threshold, cinemaMovieId, transaction = null }) => {
    const { models } = await getContext();
    const { session } = models;

    return session.destroy({
        where: {
            cinemaMovieId,
            time: {
                [Op.gt]: threshold,
            },
        },
        transaction,
    });
};
