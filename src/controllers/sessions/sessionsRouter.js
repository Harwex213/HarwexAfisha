const router = require("express").Router();
const {
    getSessionsByDateCityEvent,
    getSessionFreeTicketsById,
    postSession,
    putSession,
    deleteSession,
    schemas,
    schemasOfRequired,
} = require("./sessionsController");
const { handlerWithBody, handlerWithRequestParams, handlerWithRequestQueries } = require("../baseHandlers");
const authMiddleware = require("../../middleware/authMiddleware");
const { userRoles } = require("../../config/constants/db");

router.get(
    "/",
    handlerWithRequestQueries(
        getSessionsByDateCityEvent,
        schemas.getSessionsByDateCityEvent,
        schemasOfRequired.getSessionsByDateCityEvent
    )
);
router.get(
    "/free/:id",
    handlerWithRequestParams(
        getSessionFreeTicketsById,
        schemas.getSessionFreeTicketsById,
        schemasOfRequired.getSessionFreeTicketsById
    )
);
router.post(
    "/",
    authMiddleware([userRoles.manager]),
    handlerWithBody(postSession, schemas.postSession, schemasOfRequired.postSession)
);
router.put(
    "/",
    authMiddleware([userRoles.manager]),
    handlerWithBody(putSession, schemas.putSession, schemasOfRequired.putSession)
);
router.delete(
    "/:id",
    authMiddleware([userRoles.manager]),
    handlerWithRequestParams(deleteSession, schemas.deleteSession, schemasOfRequired.deleteSession)
);

module.exports = router;
