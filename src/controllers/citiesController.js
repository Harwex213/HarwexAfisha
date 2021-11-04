const router = require("express").Router();
const cityService = require("../services/cityService");
const { responseOk } = require("./helper/response");
const validateModel = require("./helper/requestBodyValidator");

const schemasOfRequired = {
    postCity: ["name"],
    putCity: ["id", "name"],
    deleteCity: ["id"],
};

const schemas = {
    postCity: {
        name: null,
    },
    putCity: {
        id: null,
        name: null,
    },
    deleteCity: {
        id: null,
    },
};

const getCities = async (request, response, next) => {
    try {
        const result = await cityService.getCities();

        responseOk(result, response);
    } catch (e) {
        next(e);
    }
};

const postCity = async (request, response, next) => {
    try {
        const model = {
            ...schemas.postCity,
            ...request.body,
        };
        console.log("Received model", model);
        validateModel(model, schemasOfRequired.postCity);

        const result = await cityService.insertCity(model);

        responseOk(result, response);
    } catch (e) {
        next(e);
    }
};

const putCity = async (request, response, next) => {
    try {
        const model = {
            ...schemas.putCity,
            ...request.body,
        };
        console.log("Received model", model);
        validateModel(model, schemasOfRequired.putCity);

        const result = await cityService.updateCity(model);

        responseOk(result, response);
    } catch (e) {
        next(e);
    }
};

const deleteCity = async (request, response, next) => {
    try {
        const model = {
            ...schemas.deleteCity,
            id: request.params.cityId,
        };
        console.log("Received model", model);
        validateModel(model, schemasOfRequired.deleteCity);

        const result = await cityService.deleteCity(model);

        responseOk(result, response);
    } catch (e) {
        next(e);
    }
};

router.get("/", getCities);
router.post("/", postCity);
router.put("/", putCity);
router.delete("/:cityId", deleteCity);

module.exports = router;
