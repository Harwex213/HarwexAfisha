const config = require("config");

const pools = {
    mainDatabase: {
        name: config.get("mssql.mainDatabase.poolName"),
        config: config.get("mssql.mainDatabase.config"),
    },
    replicationDatabase: {
        name: config.get("mssql.replicationDatabase.poolName"),
        config: config.get("mssql.replicationDatabase.config"),
    },
};

const swapReplicationToMain = () => {
    console.log("Swapping replication database config to main");

    pools.replicationDatabase.name = pools.mainDatabase.name;
    pools.replicationDatabase.config = pools.mainDatabase.config;
};

module.exports = {
    pools,
    swapReplicationToMain,
};
