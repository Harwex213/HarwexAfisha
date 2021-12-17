const router = require("express").Router();
const {
    getPopularCities,
    getCity,
    postCity,
    putCity,
    deleteCity,
    schemas,
    schemasOfRequired,
} = require("./citiesController");
const { handlerWithoutBody, handlerWithBody, handlerWithRequestParams } = require("../baseHandlers");
const authMiddleware = require("../../middleware/authMiddleware");
const { userRoles } = require("../../config/constants/db");

router.get("/popular", handlerWithoutBody(getPopularCities));
router.get("/:name", handlerWithRequestParams(getCity, schemas.getCity, schemasOfRequired.getCity));
router.post(
    "/",
    authMiddleware([userRoles.manager]),
    handlerWithBody(postCity, schemas.postCity, schemasOfRequired.postCity)
);
router.put(
    "/",
    authMiddleware([userRoles.manager]),
    handlerWithBody(putCity, schemas.putCity, schemasOfRequired.putCity)
);
router.delete(
    "/:id",
    authMiddleware([userRoles.manager]),
    handlerWithRequestParams(deleteCity, schemas.deleteCity, schemasOfRequired.deleteCity)
);

module.exports = router;
