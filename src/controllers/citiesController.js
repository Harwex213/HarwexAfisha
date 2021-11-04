const router = require("express").Router();
const cityService = require("../services/cityService");
const { responseOk } = require("./helper/response");
const validateModel = require("./helper/requestBodyValidator");

const schemas = {
    postCity: ["name"],
    putCity: ["id", "name"],
    deleteCity: ["id"],
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
        const body = request.body;
        const model = { name: body.name };
        validateModel(model, schemas.postCity);

        const result = await cityService.insertCity(model);

        responseOk(result, response);
    } catch (e) {
        next(e);
    }
};

const putCity = async (request, response, next) => {
    try {
        const body = request.body;
        const model = { id: body.id, name: body.name };
        validateModel(model, schemas.putCity);

        const result = await cityService.updateCity(model);

        responseOk(result, response);
    } catch (e) {
        next(e);
    }
};

const deleteCity = async (request, response, next) => {
    try {
        const id = request.params.cityId;
        const model = { id };
        validateModel(model, schemas.deleteCity);

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
