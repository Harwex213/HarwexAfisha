const router = require("express").Router();
const { login, register, schemas, schemasOfRequired } = require("./authController");
const { handlerWithBody } = require("../baseHandlers");

router.post("/login", handlerWithBody(login, schemas.login, schemasOfRequired.login));
router.post("/register", handlerWithBody(register, schemas.register, schemasOfRequired.register));

module.exports = router;
