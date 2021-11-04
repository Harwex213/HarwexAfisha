const router = require("express").Router();
const eventService = require("../services/eventService");
const { responseOk } = require("./helper/response");
const validateModel = require("./helper/requestBodyValidator");

const schemasOfRequired = {
    postEvent: ["name", "description"],
    putEvent: ["id", "name", "description"],
    deleteEvent: ["id"],
};

const schemas = {
    postEvent: {
        name: null,
        description: null,
    },
    putEvent: {
        id: null,
        name: null,
        description: null,
    },
    deleteEvent: {
        id: null,
    },
};

const getEvents = async (request, response, next) => {
    try {
        const result = await eventService.getEvents();

        responseOk(result, response);
    } catch (e) {
        next(e);
    }
};

const postEvent = async (request, response, next) => {
    try {
        const model = {
            ...schemas.postEvent,
            ...request.body,
        };
        console.log("Received model", model);
        validateModel(model, schemasOfRequired.postEvent);

        const result = await eventService.insertEvent(model);

        responseOk(result, response);
    } catch (e) {
        next(e);
    }
};

const putEvent = async (request, response, next) => {
    try {
        const model = {
            ...schemas.putEvent,
            ...request.body,
        };
        console.log("Received model", model);
        validateModel(model, schemasOfRequired.putEvent);

        const result = await eventService.updateEvent(model);

        responseOk(result, response);
    } catch (e) {
        next(e);
    }
};

const deleteEvent = async (request, response, next) => {
    try {
        const model = {
            ...schemas.deleteEvent,
            id: request.params.eventId,
        };
        console.log("Received model", model);
        validateModel(model, schemasOfRequired.deleteEvent);

        const result = await eventService.deleteEvent(model);

        responseOk(result, response);
    } catch (e) {
        next(e);
    }
};

router.get("/", getEvents);
router.post("/", postEvent);
router.put("/", putEvent);
router.delete("/:eventId", deleteEvent);

module.exports = router;
