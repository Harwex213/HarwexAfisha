const router = require("express").Router();
const { getUsers, postUser, putUser, deleteUser, schemas, schemasOfRequired } = require("./usersController");
const { handlerWithoutBody, handlerWithBody, handlerWithRequestParams } = require("../baseHandlers");
const authMiddleware = require("../../middleware/authMiddleware");
const { userRoles } = require("../../config/constants/db");

router.get("/", authMiddleware([userRoles.manager]), handlerWithoutBody(getUsers));
router.post(
    "/",
    authMiddleware([userRoles.manager]),
    handlerWithBody(postUser, schemas.postUser, schemasOfRequired.postUser)
);
router.put(
    "/",
    authMiddleware([userRoles.manager]),
    handlerWithBody(putUser, schemas.putUser, schemasOfRequired.putUser)
);
router.delete(
    "/:id",
    authMiddleware([userRoles.manager]),
    handlerWithRequestParams(deleteUser, schemas.deleteUser, schemasOfRequired.deleteUser)
);

module.exports = router;
