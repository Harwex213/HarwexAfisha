const router = require("express").Router();
const {
    getEventPlaces,
    postEventPlace,
    deleteEventPlace,
    schemas,
    schemasOfRequired,
} = require("./eventPlacesController");
const { handlerWithoutBody, handlerWithBody, handlerWithRequestString } = require("../helper/baseHandlers");

router.get("/", handlerWithoutBody(getEventPlaces));
router.post("/", handlerWithBody(postEventPlace, schemas.postEventPlace, schemasOfRequired.postEventPlace));
router.delete(
    "/:id",
    handlerWithRequestString(deleteEventPlace, schemas.deleteEventPlace, schemasOfRequired.deleteEventPlace)
);

module.exports = router;
