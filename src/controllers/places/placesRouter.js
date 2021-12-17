const router = require("express").Router();
const {
    getPlacesChunk,
    postPlace,
    putPlace,
    deletePlace,
    schemas,
    schemasOfRequired,
} = require("./placesController");
const { handlerWithoutBody, handlerWithBody, handlerWithRequestParams } = require("../baseHandlers");
const authMiddleware = require("../../middleware/authMiddleware");
const { userRoles } = require("../../config/constants/db");

router.get("/", authMiddleware([userRoles.manager]), handlerWithoutBody(getPlacesChunk));
router.post(
    "/",
    authMiddleware([userRoles.manager]),
    handlerWithBody(postPlace, schemas.postPlace, schemasOfRequired.postPlace)
);
router.put(
    "/",
    authMiddleware([userRoles.manager]),
    handlerWithBody(putPlace, schemas.putPlace, schemasOfRequired.putPlace)
);
router.delete(
    "/:id",
    authMiddleware([userRoles.manager]),
    handlerWithRequestParams(deletePlace, schemas.deletePlace, schemasOfRequired.deletePlace)
);

module.exports = router;
