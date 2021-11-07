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
const authMiddleware = require("../../middleware/authMiddleware");
const { userRoles } = require("../../../config/constans");

router.get("/", handlerWithoutBody(getEvents));
router.post(
    "/",
    authMiddleware([userRoles.admin]),
    handlerWithBody(postEvent, schemas.postEvent, schemasOfRequired.postEvent)
);
router.put(
    "/",
    authMiddleware([userRoles.admin]),
    handlerWithBody(putEvent, schemas.putEvent, schemasOfRequired.putEvent)
);
router.delete(
    "/:id",
    authMiddleware([userRoles.admin]),
    handlerWithRequestString(deleteEvent, schemas.deleteEvent, schemasOfRequired.deleteEvent)
);

module.exports = router;
