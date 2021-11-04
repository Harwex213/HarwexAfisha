const router = require("express").Router();
const sessionService = require("../services/sessionService");
const { responseOk } = require("./helper/response");
const validateModel = require("./helper/requestBodyValidator");

const schemasOfRequired = {
    postSession: ["eventPlaceId", "time", "ticketsAmount"],
    putSession: ["id", "eventPlaceId", "time", "ticketsAmount"],
    deleteSession: ["id"],
};

const schemas = {
    postSession: {
        eventPlaceId: null,
        time: null,
        ticketsAmount: null,
    },
    putSession: {
        id: null,
        eventPlaceId: null,
        time: null,
        ticketsAmount: null,
    },
    deleteSession: {
        id: null,
    },
};

const getSessions = async (request, response, next) => {
    try {
        const result = await sessionService.getSessions();

        responseOk(result, response);
    } catch (e) {
        next(e);
    }
};

const postSession = async (request, response, next) => {
    try {
        const model = {
            ...schemas.postSession,
            ...request.body,
        };
        console.log("Received model", model);
        validateModel(model, schemasOfRequired.postSession);

        const result = await sessionService.insertSession(model);

        responseOk(result, response);
    } catch (e) {
        next(e);
    }
};

const putSession = async (request, response, next) => {
    try {
        const model = {
            ...schemas.putSession,
            ...request.body,
        };
        console.log("Received model", model);
        validateModel(model, schemasOfRequired.putSession);

        const result = await sessionService.updateSession(model);

        responseOk(result, response);
    } catch (e) {
        next(e);
    }
};

const deleteSession = async (request, response, next) => {
    try {
        const model = {
            ...schemas.deleteSession,
            id: request.params.sessionId,
        };
        console.log("Received model", model);
        validateModel(model, schemasOfRequired.deleteSession);

        const result = await sessionService.deleteSession(model);

        responseOk(result, response);
    } catch (e) {
        next(e);
    }
};

router.get("/", getSessions);
router.post("/", postSession);
router.put("/", putSession);
router.delete("/:sessionId", deleteSession);

module.exports = router;
