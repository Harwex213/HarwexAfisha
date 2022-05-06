const getContext = require("../sequelize");
const { Op } = require("sequelize");

module.exports.find = async ({ cityName = "", transaction = null }) => {
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
        offset: 0,
        raw: true,
        nest: true,
    });
};
