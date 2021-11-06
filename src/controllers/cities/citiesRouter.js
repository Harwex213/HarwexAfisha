const router = require("express").Router();
const {
    getCities,
    postCity,
    putCity,
    deleteCity,
    schemas,
    schemasOfRequired,
} = require("./citiesController");
const { handlerWithoutBody, handlerWithBody, handlerWithRequestString } = require("../helper/baseHandlers");
const authMiddleware = require("../../middleware/authMiddleware");
const { userRoles } = require("../../constans");

router.get("/", handlerWithoutBody(getCities));
router.post(
    "/",
    authMiddleware([userRoles.admin]),
    handlerWithBody(postCity, schemas.postCity, schemasOfRequired.postCity)
);
router.put(
    "/",
    authMiddleware([userRoles.admin]),
    handlerWithBody(putCity, schemas.putCity, schemasOfRequired.putCity)
);
router.delete(
    "/:id",
    authMiddleware([userRoles.admin]),
    handlerWithRequestString(deleteCity, schemas.deleteCity, schemasOfRequired.deleteCity)
);

module.exports = router;
