const router = require("express").Router();
const { getTickets, postTicket, deleteTicket, schemas, schemasOfRequired } = require("./ticketsController");
const { handlerWithBody, handlerWithoutBody, handlerWithRequestParams } = require("../baseHandlers");
const authMiddleware = require("../../middleware/authMiddleware");
const { userRoles } = require("../../config/constants/db");

router.get("/", authMiddleware([userRoles.user, userRoles.manager]), handlerWithoutBody(getTickets));
router.post(
    "/",
    authMiddleware([userRoles.user, userRoles.manager]),
    handlerWithBody(postTicket, schemas.postTicket, schemasOfRequired.postTicket)
);
router.delete(
    "/:id",
    authMiddleware([userRoles.user, userRoles.manager]),
    handlerWithRequestParams(deleteTicket, schemas.deleteTicket, schemasOfRequired.deleteTicket)
);

module.exports = router;
