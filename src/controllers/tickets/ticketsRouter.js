const router = require("express").Router();
const { getTickets, postTicket, deleteTicket, schemas, schemasOfRequired } = require("./ticketsController");
const { handlerWithBody, handlerWithoutBody, handlerWithRequestString } = require("../helper/baseHandlers");
const authMiddleware = require("../../middleware/authMiddleware");
const { userRoles } = require("../../config/constants/db");

router.get("/", authMiddleware([userRoles.user, userRoles.admin]), handlerWithoutBody(getTickets));
router.post(
    "/",
    authMiddleware([userRoles.user, userRoles.admin]),
    handlerWithBody(postTicket, schemas.postTicket, schemasOfRequired.postTicket)
);
router.delete(
    "/:id",
    authMiddleware([userRoles.user, userRoles.admin]),
    handlerWithRequestString(deleteTicket, schemas.deleteTicket, schemasOfRequired.deleteTicket)
);

module.exports = router;
