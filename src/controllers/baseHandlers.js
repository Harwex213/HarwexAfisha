const validateModel = require("./helper/requestBodyValidator");

const handlerWithoutBody = (handler) => async (request, response, next) => {
    try {
        const data = await handler(request, response);
        response.status(200).json(data);
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
            validateModel(model, schemaOfRequired);
        }

        const data = await handler(model, request, response);
        response.status(200).json(data);
    } catch (e) {
        next(e);
    }
};

const handlerWithRequestParams = (handler, schema, schemaOfRequired) => async (request, response, next) => {
    try {
        let model = {};
        if (schema) {
            model = {
                ...schema,
                ...request.params,
            };
            validateModel(model, schemaOfRequired);
        }

        const data = await handler(model, request, response);
        response.status(200).json(data);
    } catch (e) {
        next(e);
    }
};

const handlerWithRequestQueries = (handler, schema, schemaOfRequired) => async (request, response, next) => {
    try {
        let model = {};
        if (schema) {
            model = {
                ...schema,
                ...request.query,
            };
            validateModel(model, schemaOfRequired);
        }

        const data = await handler(model, request, response);
        response.status(200).json(data);
    } catch (e) {
        next(e);
    }
};

const handlerWithRequestParamsAndQueries =
    (handler, schema, schemaOfRequired) => async (request, response, next) => {
        try {
            let model = {};
            if (schema) {
                model = {
                    ...schema,
                    ...request.params,
                    ...request.query,
                };
                validateModel(model, schemaOfRequired);
            }

            const data = await handler(model, request, response);
            response.status(200).json(data);
        } catch (e) {
            next(e);
        }
    };

module.exports = {
    handlerWithoutBody,
    handlerWithBody,
    handlerWithRequestParams,
    handlerWithRequestQueries,
    handlerWithRequestParamsAndQueries,
};
