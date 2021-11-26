const emitter = new (require("events"))();
const events = {
    dbAvailable: "AD",
    dbUnavailable: "UAD",
    tryingResolveUAD: "tryingResolveUAD",
    allDbLost: "allDbLost",
    swapSlaveToMaster: "swapSlaveToMaster",
};

module.exports = {
    emitter,
    events,
};
