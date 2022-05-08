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
