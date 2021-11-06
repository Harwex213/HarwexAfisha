const router = require("express").Router();
const {
    getEventPlaces,
    postEventPlace,
    deleteEventPlace,
    schemas,
    schemasOfRequired,
} = require("./eventPlacesController");
const { handlerWithoutBody, handlerWithBody, handlerWithRequestString } = require("../helper/baseHandlers");
const authMiddleware = require("../../middleware/authMiddleware");
const { userRoles } = require("../../constans");

router.get("/", authMiddleware([userRoles.admin]), handlerWithoutBody(getEventPlaces));
router.post(
    "/",
    authMiddleware([userRoles.admin]),
    handlerWithBody(postEventPlace, schemas.postEventPlace, schemasOfRequired.postEventPlace)
);
router.delete(
    "/:id",
    authMiddleware([userRoles.admin]),
    handlerWithRequestString(deleteEventPlace, schemas.deleteEventPlace, schemasOfRequired.deleteEventPlace)
);

module.exports = router;
