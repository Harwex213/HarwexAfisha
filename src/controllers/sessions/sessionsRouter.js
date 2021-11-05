const router = require("express").Router();
const {
    getSessions,
    postSession,
    putSession,
    deleteSession,
    schemas,
    schemasOfRequired,
} = require("./sessionsController");
const { handlerWithoutBody, handlerWithBody, handlerWithRequestString } = require("../helper/baseHandlers");

router.get("/", handlerWithoutBody(getSessions));
router.post("/", handlerWithBody(postSession, schemas.postSession, schemasOfRequired.postSession));
router.put("/", handlerWithBody(putSession, schemas.putSession, schemasOfRequired.putSession));
router.delete(
    "/:id",
    handlerWithRequestString(deleteSession, schemas.deleteSession, schemasOfRequired.deleteSession)
);

module.exports = router;
