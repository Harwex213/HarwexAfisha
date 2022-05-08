const getContext = require("../sequelize");
const { Op } = require("sequelize");

module.exports.find = async ({ name = "", cityId, offset = 0, transaction = null }) => {
    const { models } = await getContext();
    const { cinema } = models;

    return cinema.findAndCountAll({
        where: {
            cityId,
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
