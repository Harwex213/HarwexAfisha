const getContext = require("./sequelize");

module.exports.executeTransaction = async (executor) => {
    const { sequelize } = await getContext();

    await sequelize.transaction(executor);
};
