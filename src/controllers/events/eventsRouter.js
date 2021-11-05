const router = require("express").Router();
const {
    getEvents,
    postEvent,
    putEvent,
    deleteEvent,
    schemas,
    schemasOfRequired,
} = require("./eventsController");
const { handlerWithoutBody, handlerWithBody, handlerWithRequestString } = require("../helper/baseHandlers");

router.get("/", handlerWithoutBody(getEvents));
router.post("/", handlerWithBody(postEvent, schemas.postEvent, schemasOfRequired.postEvent));
router.put("/", handlerWithBody(putEvent, schemas.putEvent, schemasOfRequired.putEvent));
router.delete(
    "/:id",
    handlerWithRequestString(deleteEvent, schemas.deleteEvent, schemasOfRequired.deleteEvent)
);

module.exports = router;
