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

module.exports.getSessionAvailableTicketsAmount = async ({ sessionId, transaction = null }) => {
    const { models } = await getContext();
    const { session, hall } = models;

    const sessionToFind = await session.findByPk(sessionId, {
        attributes: ["ticketsOrdered"],
        include: {
            model: hall,
            as: "hall",
            attributes: ["seatsAmount"],
        },
        transaction,
        raw: true,
        nest: true,
    });

    return sessionToFind.hall.seatsAmount - sessionToFind.ticketsOrdered;
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
