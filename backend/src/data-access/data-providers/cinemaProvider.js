const getContext = require("../sequelize");

module.exports.getPart = async ({ offset, transaction = null }) => {
    const { models } = await getContext();
    const { cinema, city } = models;

    const cinemas = await cinema.findAndCountAll({
        attributes: { exclude: ["cityId"] },
        include: [
            {
                model: city,
                as: "city",
            },
        ],
        limit: 15,
        offset: offset * 15,
        transaction,
        raw: true,
        nest: true,
    });

    const rows = cinemas.rows.map((row) => {
        const newRow = { ...row };
        newRow.cityId = row.city.id;
        newRow.cityName = row.city.name;
        delete newRow.city;
        return newRow;
    });
    return {
        count: cinemas.count,
        rows,
    };
};
