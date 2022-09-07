const getContext = require("../sequelize");

module.exports.getUserByUsername = async ({ username, transaction = null }) => {
    const { models } = await getContext();
    const { user } = models;

    return await user.findOne({
        where: {
            username,
        },
        transaction,
        raw: true,
        nest: true,
    });
};
