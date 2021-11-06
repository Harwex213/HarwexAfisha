const validateModel = require("../helper/requestBodyValidator");

const handlerWithoutBody = (handler) => async (request, response, next) => {
    try {
        const data = await handler(request, response);
        response.status(200).json({ data });
    } catch (e) {
        next(e);
    }
};

const handlerWithBody = (handler, schema, schemaOfRequired) => async (request, response, next) => {
    try {
        let model = {};
        if (schema) {
            model = {
                ...schema,
                ...request.body,
            };
            console.log("Received model", model);
            validateModel(model, schemaOfRequired);
        }

        const data = await handler(model, request, response);
        response.status(200).json({ data });
    } catch (e) {
        next(e);
    }
};

const handlerWithRequestString = (handler, schema, schemaOfRequired) => async (request, response, next) => {
    try {
        let model = {};
        if (schema) {
            model = {
                ...schema,
                ...request.params,
            };
            console.log("Received request string", model);
            validateModel(model, schemaOfRequired);
        }

        const data = await handler(model, request, response);
        response.status(200).json({ data });
    } catch (e) {
        next(e);
    }
};

module.exports = {
    handlerWithoutBody,
    handlerWithBody,
    handlerWithRequestString,
};
