const router = require("express").Router();
const eventPlaceService = require("../services/eventPlaceService");
const { responseOk } = require("./helper/response");
const validateModel = require("./helper/requestBodyValidator");

const schemasOfRequired = {
    postEventPlace: ["eventId", "placeId"],
    deleteEventPlace: ["id"],
};

const schemas = {
    postEventPlace: {
        eventId: null,
        placeId: null,
    },
    deleteEventPlace: {
        id: null,
    },
};

const getEventPlaces = async (request, response, next) => {
    try {
        const result = await eventPlaceService.getEventPlaces();

        responseOk(result, response);
    } catch (e) {
        next(e);
    }
};

const postEventPlace = async (request, response, next) => {
    try {
        const model = {
            ...schemas.postEventPlace,
            ...request.body,
        };
        console.log("Received model", model);
        validateModel(model, schemasOfRequired.postEventPlace);

        const result = await eventPlaceService.insertEventPlace(model);

        responseOk(result, response);
    } catch (e) {
        next(e);
    }
};

const deleteEventPlace = async (request, response, next) => {
    try {
        const model = {
            ...schemas.deleteEventPlace,
            id: request.params.eventPlaceId,
        };
        console.log("Received model", model);
        validateModel(model, schemasOfRequired.deleteEventPlace);

        const result = await eventPlaceService.deleteEventPlace(model);

        responseOk(result, response);
    } catch (e) {
        next(e);
    }
};

router.get("/", getEventPlaces);
router.post("/", postEventPlace);
router.delete("/:eventPlaceId", deleteEventPlace);

module.exports = router;
