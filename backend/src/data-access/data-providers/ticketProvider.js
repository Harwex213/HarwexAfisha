const getContext = require("../sequelize");
const { Op } = require("sequelize");

module.exports.deleteAllByThresholdRowPosition = async ({ row, position, hallId, transaction = null }) => {
    const { models } = await getContext();
    const { ticket, session } = models;

    const tickets = await ticket.findAll({
        attributes: ["id"],
        where: {
            [Op.or]: {
                row: {
                    [Op.gt]: row,
                },
                position: {
                    [Op.gt]: position,
                },
            },
        },
        include: [
            {
                model: session,
                as: "session",
                attributes: [],
                where: {
                    hallId,
                },
            },
        ],
        raw: true,
        nest: true,
        transaction,
    });

    return ticket.destroy({
        where: {
            id: { [Op.in]: tickets.map((ticket) => ticket.id) },
        },
    });
};

module.exports.getUserTickets = async ({
    offset,
    userId,
    thresholdDate,
    isBefore = false,
    transaction = null,
}) => {
    const { models } = await getContext();
    const { ticket, session, cinemaMovie, movie, hall, cinema, city } = models;

    const tickets = await ticket.findAndCountAll({
        attributes: ["id", "row", "position"],
        where: { userId },
        include: [
            {
                model: session,
                as: "session",
                where: {
                    time: {
                        [isBefore ? Op.lt : Op.gte]: thresholdDate,
                    },
                },
                order: [["time", "ASC"]],
                include: [
                    {
                        model: cinemaMovie,
                        as: "cinemaMovie",
                        attributes: [],
                        include: [
                            { model: movie, as: "movie", attributes: ["id", "name"] },
                            {
                                model: cinema,
                                as: "cinema",
                                attributes: ["id", "name"],
                                include: [{ model: city, as: "city", attributes: ["id", "name"] }],
                            },
                        ],
                    },
                    {
                        model: hall,
                        as: "hall",
                    },
                ],
            },
        ],
        limit: 5,
        offset: offset * 5,
        transaction,
        raw: true,
        nest: true,
    });

    for (const _ticket of tickets.rows) {
        _ticket.hallId = _ticket.session.hall.id;
        _ticket.hallName = _ticket.session.hall.name;

        _ticket.movieId = _ticket.session.cinemaMovie.movie.id;
        _ticket.movieName = _ticket.session.cinemaMovie.movie.name;

        _ticket.cinemaId = _ticket.session.cinemaMovie.cinema.id;
        _ticket.cinemaName = _ticket.session.cinemaMovie.cinema.name;

        _ticket.cityId = _ticket.session.cinemaMovie.cinema.city.id;
        _ticket.cityName = _ticket.session.cinemaMovie.cinema.city.name;

        _ticket.sessionTime = _ticket.session.time;
        _ticket.sessionPrice = _ticket.session.price;

        delete _ticket.session;
    }

    return tickets;
};
