const initApi = require("./api/api");

(async () => {
    try {
        await initApi();
    } catch (e) {
        console.log("Error while attempted to start server: ", e);
    }
})();
