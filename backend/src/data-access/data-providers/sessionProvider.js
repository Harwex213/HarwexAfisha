const { getNextDay } = require("../../helpers/time");
const { Op } = require("sequelize");
const getContext = require("../sequelize");

module.exports.getSessionsByCinemaAndDate = async ({ cinemaId, date, transaction = null }) => {
    const { models } = await getContext();
    const { session, cinemaMovie } = models;

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
            },
        ],
        transaction,
        raw: true,
        nest: true,
    });

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
