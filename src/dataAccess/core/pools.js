const config = require("config");

const pools = {
    mainDatabase: {
        name: config.get("mssql.mainDatabase.poolName"),
        config: config.get("mssql.mainDatabase.config"),
    },
};

module.exports = pools;
