process.env["NODE_CONFIG_DIR"] = __dirname + "/config/";

require("./logger");
const http = require("http");
const app = require("./app/app");

http.createServer(app).listen(5000, "localhost", () => {
    console.log("Server started");
});
