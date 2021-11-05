const router = require("express").Router();
const { getUsers, postUser, putUser, deleteUser, schemas, schemasOfRequired } = require("./usersController");
const { handlerWithoutBody, handlerWithBody, handlerWithRequestString } = require("../helper/baseHandlers");

router.get("/", handlerWithoutBody(getUsers));
router.post("/", handlerWithBody(postUser, schemas.postUser, schemasOfRequired.postUser));
router.put("/", handlerWithBody(putUser, schemas.putUser, schemasOfRequired.putUser));
router.delete("/:id", handlerWithRequestString(deleteUser, schemas.deleteUser, schemasOfRequired.deleteUser));

module.exports = router;
