const getContext = require("../sequelize");
const { Op } = require("sequelize");

module.exports.find = async ({ cityName = "", offset = 0, transaction = null }) => {
    const { models } = await getContext();
    const { city } = models;

    return city.findAndCountAll({
        where: {
            name: {
                [Op.like]: `${cityName}%`,
            },
        },
        transaction,
        limit: 30,
        offset: offset * 30,
        raw: true,
        nest: true,
    });
};
