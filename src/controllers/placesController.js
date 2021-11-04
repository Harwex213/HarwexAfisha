const router = require("express").Router();
const placeService = require("../services/placeService");
const { responseOk } = require("./helper/response");
const validateModel = require("./helper/requestBodyValidator");

const schemasOfRequired = {
    postPlace: ["name", "about", "cityName"],
    putPlace: ["id", "name", "about", "cityName"],
    deletePlace: ["id"],
};

const schemas = {
    postPlace: {
        name: null,
        about: null,
        cityName: null,
    },
    putPlace: {
        id: null,
        name: null,
        about: null,
        cityName: null,
    },
    deletePlace: {
        id: null,
    },
};

const getPlaces = async (request, response, next) => {
    try {
        const result = await placeService.getPlaces();

        responseOk(result, response);
    } catch (e) {
        next(e);
    }
};

const postPlace = async (request, response, next) => {
    try {
        const model = {
            ...schemas.postPlace,
            ...request.body,
        };
        console.log("Received model", model);
        validateModel(model, schemasOfRequired.postPlace);

        const result = await placeService.insertPlace(model);

        responseOk(result, response);
    } catch (e) {
        next(e);
    }
};

const putPlace = async (request, response, next) => {
    try {
        const model = {
            ...schemas.putPlace,
            ...request.body,
        };
        console.log("Received model", model);
        validateModel(model, schemasOfRequired.putPlace);

        const result = await placeService.updatePlace(model);

        responseOk(result, response);
    } catch (e) {
        next(e);
    }
};

const deletePlace = async (request, response, next) => {
    try {
        const model = {
            ...schemas.deletePlace,
            id: request.params.placeId,
        };
        console.log("Received model", model);
        validateModel(model, schemasOfRequired.deletePlace);

        const result = await placeService.deletePlace(model);

        responseOk(result, response);
    } catch (e) {
        next(e);
    }
};

router.get("/", getPlaces);
router.post("/", postPlace);
router.put("/", putPlace);
router.delete("/:placeId", deletePlace);

module.exports = router;
