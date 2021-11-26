const poolEmitter = require("./dataAccess/pool/poolEmitter");

poolEmitter.emitter.on(poolEmitter.events.dbAvailable, ({ dbName, dbType }) => {
    console.log(`DataAccess: successfully connected to ${dbName}, type is ${dbType}`);
});

poolEmitter.emitter.on(poolEmitter.events.dbUnavailable, ({ dbName, dbType }) => {
    console.warn(`DataAccess: was lost connection with ${dbName}, type is ${dbType}`);
});

poolEmitter.emitter.on(poolEmitter.events.allDbLost, () => {
    console.error(`DataAccess: was lost connections to all db!`);
});

poolEmitter.emitter.on(poolEmitter.events.tryingResolveUAD, ({ dbName }) => {
    console.warn(`DataAccess: trying connect to ${dbName}`);
});
