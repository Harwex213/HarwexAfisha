const pools = require("./pools");
const { createPool } = require("./poolManager");

module.exports = () => {
    createPool(pools.mainDatabase.config, pools.mainDatabase.name);
};
