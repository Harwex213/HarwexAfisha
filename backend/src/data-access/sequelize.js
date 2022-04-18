const dbConfig = require("config").get("dbConfig");
const { Sequelize } = require("sequelize");
const initModels = require("../models/init-models");

let sequelize = null;
let models = null;

module.exports = async () => {
    if (models) {
        return {
            sequelize,
            models,
        };
    }

    sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
        host: dbConfig.host,
        dialect: dbConfig.dialect,
    });

    await sequelize.authenticate();
    models = initModels(sequelize);

    return {
        sequelize,
        models,
    };
};
