const { pools, swapReplicationToMain } = require("./pools");
const { createPool } = require("./poolManager");

module.exports = () => {
    createPool(pools.mainDatabase.config, pools.mainDatabase.name).catch(() => {
        console.log("Critical error");
        process.exit(-1);
    });
    createPool(pools.replicationDatabase.config, pools.replicationDatabase.name).catch(() => {
        swapReplicationToMain();
    });
};
