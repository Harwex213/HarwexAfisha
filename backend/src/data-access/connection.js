const getContext = require("./sequelize");

module.exports.executeTransaction = async (executor) => {
    const { sequelize } = await getContext();

    return await sequelize.transaction(executor);
};
