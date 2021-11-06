const router = require("express").Router();
const {
    getSessions,
    getSessionFreeTicketsById,
    postSession,
    putSession,
    deleteSession,
    schemas,
    schemasOfRequired,
} = require("./sessionsController");
const { handlerWithoutBody, handlerWithBody, handlerWithRequestString } = require("../helper/baseHandlers");
const authMiddleware = require("../../middleware/authMiddleware");
const { userRoles } = require("../../constans");

router.get("/", handlerWithoutBody(getSessions));
router.get(
    "/free/:id",
    handlerWithRequestString(
        getSessionFreeTicketsById,
        schemas.getSessionFreeTicketsById,
        schemasOfRequired.getSessionFreeTicketsById
    )
);
router.post(
    "/",
    authMiddleware([userRoles.admin]),
    handlerWithBody(postSession, schemas.postSession, schemasOfRequired.postSession)
);
router.put(
    "/",
    authMiddleware([userRoles.admin]),
    handlerWithBody(putSession, schemas.putSession, schemasOfRequired.putSession)
);
router.delete(
    "/:id",
    authMiddleware([userRoles.admin]),
    handlerWithRequestString(deleteSession, schemas.deleteSession, schemasOfRequired.deleteSession)
);

module.exports = router;
