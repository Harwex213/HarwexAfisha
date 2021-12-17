const router = require("express").Router();
const {
    getEventsByDateAndCity,
    getEvent,
    postEvent,
    putEvent,
    deleteEvent,
    schemas,
    schemasOfRequired,
} = require("./eventsController");
const { handlerWithRequestQueries, handlerWithBody, handlerWithRequestParams } = require("../baseHandlers");
const authMiddleware = require("../../middleware/authMiddleware");
const { userRoles } = require("../../config/constants/db");

router.get(
    "/",
    handlerWithRequestQueries(
        getEventsByDateAndCity,
        schemas.getEventsByDateAndCity,
        schemasOfRequired.getEventsByDateAndCity
    )
);
router.get("/:id", handlerWithRequestParams(getEvent, schemas.getEvent, schemasOfRequired.getEvent));
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
