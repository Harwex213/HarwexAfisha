const router = require("express").Router();
const { getUsers, postUser, putUser, deleteUser, schemas, schemasOfRequired } = require("./usersController");
const { handlerWithoutBody, handlerWithBody, handlerWithRequestString } = require("../helper/baseHandlers");
const authMiddleware = require("../../middleware/authMiddleware");
const { userRoles } = require("../../constans");

router.get("/", authMiddleware([userRoles.admin]), handlerWithoutBody(getUsers));
router.post(
    "/",
    authMiddleware([userRoles.admin]),
    handlerWithBody(postUser, schemas.postUser, schemasOfRequired.postUser)
);
router.put(
    "/",
    authMiddleware([userRoles.admin]),
    handlerWithBody(putUser, schemas.putUser, schemasOfRequired.putUser)
);
router.delete(
    "/:id",
    authMiddleware([userRoles.admin]),
    handlerWithRequestString(deleteUser, schemas.deleteUser, schemasOfRequired.deleteUser)
);

module.exports = router;
