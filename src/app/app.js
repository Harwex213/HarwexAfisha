const express = require("express");
const useLogger = require("./logger");
const useRequestBodyParser = require("./requestBodyParser");
const useRoutes = require("./routesRegister");
const useErrorHandler = require("./errorHandler");

const app = express();

useLogger(app);
useRequestBodyParser(app);
useRoutes(app);
useErrorHandler(app);

module.exports = app;
