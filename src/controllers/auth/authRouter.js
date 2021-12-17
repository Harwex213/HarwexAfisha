const router = require("express").Router();
const { getUser, login, register, schemas, schemasOfRequired } = require("./authController");
const { handlerWithBody, handlerWithoutBody } = require("../baseHandlers");
const authMiddleware = require("../../middleware/authMiddleware");
const { userRoles } = require("../../config/constants/db");

router.get("/", authMiddleware([userRoles.user, userRoles.manager]), handlerWithoutBody(getUser));
router.post("/login", handlerWithBody(login, schemas.login, schemasOfRequired.login));
router.post("/register", handlerWithBody(register, schemas.register, schemasOfRequired.register));

module.exports = router;
