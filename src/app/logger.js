const morgan = require("morgan");
const config = require("config");

module.exports = (app) => {
    app.use(morgan(config.get("morgan.format")));
};
