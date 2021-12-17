const router = require("express").Router();
const {
    getEvents,
    postEvent,
    putEvent,
    deleteEvent,
    schemas,
    schemasOfRequired,
} = require("./eventsController");
const { handlerWithoutBody, handlerWithBody, handlerWithRequestParams } = require("../baseHandlers");
const authMiddleware = require("../../middleware/authMiddleware");
const { userRoles } = require("../../config/constants/db");

router.get("/", handlerWithoutBody(getEvents));
router.post(
    "/",
    authMiddleware([userRoles.manager]),
    handlerWithBody(postEvent, schemas.postEvent, schemasOfRequired.postEvent)
);
router.put(
    "/",
    authMiddleware([userRoles.manager]),
    handlerWithBody(putEvent, schemas.putEvent, schemasOfRequired.putEvent)
);
router.delete(
    "/:id",
    authMiddleware([userRoles.manager]),
    handlerWithRequestParams(deleteEvent, schemas.deleteEvent, schemasOfRequired.deleteEvent)
);

module.exports = router;
