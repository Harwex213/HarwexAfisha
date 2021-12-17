const router = require("express").Router();
const {
    getEventPlaces,
    postEventPlace,
    deleteEventPlace,
    schemas,
    schemasOfRequired,
} = require("./eventPlacesController");
const { handlerWithoutBody, handlerWithBody, handlerWithRequestParams } = require("../baseHandlers");
const authMiddleware = require("../../middleware/authMiddleware");
const { userRoles } = require("../../config/constants/db");

router.get("/", handlerWithoutBody(getEventPlaces));
router.post(
    "/",
    authMiddleware([userRoles.manager]),
    handlerWithBody(postEventPlace, schemas.postEventPlace, schemasOfRequired.postEventPlace)
);
router.delete(
    "/:id",
    authMiddleware([userRoles.manager]),
    handlerWithRequestParams(deleteEventPlace, schemas.deleteEventPlace, schemasOfRequired.deleteEventPlace)
);

module.exports = router;
