const router = require("express").Router();
const {
    getPlaces,
    postPlace,
    putPlace,
    deletePlace,
    schemas,
    schemasOfRequired,
} = require("./placesController");
const { handlerWithoutBody, handlerWithBody, handlerWithRequestString } = require("../helper/baseHandlers");

router.get("/", handlerWithoutBody(getPlaces));
router.post("/", handlerWithBody(postPlace, schemas.postPlace, schemasOfRequired.postPlace));
router.put("/", handlerWithBody(putPlace, schemas.putPlace, schemasOfRequired.putPlace));
router.delete(
    "/:id",
    handlerWithRequestString(deletePlace, schemas.deletePlace, schemasOfRequired.deletePlace)
);

module.exports = router;
