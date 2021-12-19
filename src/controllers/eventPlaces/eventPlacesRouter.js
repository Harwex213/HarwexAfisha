const router = require("express").Router();
const {
    getEventsChunkByPlace,
    postEventPlace,
    deleteEventPlace,
    schemas,
    schemasOfRequired,
} = require("./eventPlacesController");
const { handlerWithBody, handlerWithRequestParams, handlerWithRequestQueries } = require("../baseHandlers");
const authMiddleware = require("../../middleware/authMiddleware");
const { userRoles } = require("../../config/constants/db");

router.get(
    "/chunk",
    authMiddleware([userRoles.manager]),
    handlerWithRequestQueries(
        getEventsChunkByPlace,
        schemas.getEventsChunkByPlace,
        schemasOfRequired.getEventsChunkByPlace
    )
);
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
