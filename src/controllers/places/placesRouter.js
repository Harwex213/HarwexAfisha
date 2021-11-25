const router = require("express").Router();
const {
    getPlaces,
    postPlace,
    putPlace,
    deletePlace,
    schemas,
    schemasOfRequired,
} = require("./placesController");
const { handlerWithoutBody, handlerWithBody, handlerWithRequestString } = require("../helper/baseHandlers");
const authMiddleware = require("../../middleware/authMiddleware");
const { userRoles } = require("../../../config/constants/db");

router.get("/", handlerWithoutBody(getPlaces));
router.post(
    "/",
    authMiddleware([userRoles.admin]),
    handlerWithBody(postPlace, schemas.postPlace, schemasOfRequired.postPlace)
);
router.put(
    "/",
    authMiddleware([userRoles.admin]),
    handlerWithBody(putPlace, schemas.putPlace, schemasOfRequired.putPlace)
);
router.delete(
    "/:id",
    authMiddleware([userRoles.admin]),
    handlerWithRequestString(deletePlace, schemas.deletePlace, schemasOfRequired.deletePlace)
);

module.exports = router;
