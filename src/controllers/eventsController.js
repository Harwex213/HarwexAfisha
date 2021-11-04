const router = require("express").Router();
const eventService = require("../services/eventService");
const { responseOk } = require("./helper/response");
const validateModel = require("./helper/requestBodyValidator");

const schemas = {
    postEvent: ["name", "description"],
    putEvent: ["id", "name", "description"],
    deleteEvent: ["id"],
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
        const body = request.body;
        const model = {
            name: body.name,
            description: body.description,
        };
        validateModel(model, schemas.postEvent);

        const result = await eventService.insertEvent(model);

        responseOk(result, response);
    } catch (e) {
        next(e);
    }
};

const putEvent = async (request, response, next) => {
    try {
        const body = request.body;
        const model = {
            id: body.id,
            name: body.name,
            description: body.description,
        };
        validateModel(model, schemas.putEvent);

        const result = await eventService.updateEvent(model);

        responseOk(result, response);
    } catch (e) {
        next(e);
    }
};

const deleteEvent = async (request, response, next) => {
    try {
        const id = request.params.eventId;
        const model = { id };
        validateModel(model, schemas.deleteEvent);

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
