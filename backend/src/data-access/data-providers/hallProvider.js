const getContext = require("../sequelize");
const { Op } = require("sequelize");

module.exports.find = async ({ name = "", cinemaId, offset = 0, transaction = null }) => {
    const { models } = await getContext();
    const { hall } = models;

    return hall.findAndCountAll({
        where: {
            cinemaId,
            name: {
                [Op.like]: `${name}%`,
            },
        },
        transaction,
        limit: 30,
        offset: offset * 30,
        raw: true,
        nest: true,
    });
};
