const router = require("express").Router();
const {
    getCities,
    postCity,
    putCity,
    deleteCity,
    schemas,
    schemasOfRequired,
} = require("./citiesController");
const { handlerWithoutBody, handlerWithBody, handlerWithRequestString } = require("../helper/baseHandlers");

router.get("/", handlerWithoutBody(getCities));
router.post("/", handlerWithBody(postCity, schemas.postCity, schemasOfRequired.postCity));
router.put("/", handlerWithBody(putCity, schemas.putCity, schemasOfRequired.putCity));
router.delete("/:id", handlerWithRequestString(deleteCity, schemas.deleteCity, schemasOfRequired.deleteCity));

module.exports = router;
