const router = require("express").Router();
const { getTickets, postTicket, deleteTicket, schemas, schemasOfRequired } = require("./ticketsController");
const { handlerWithoutBody, handlerWithRequestString } = require("../helper/baseHandlers");
const authMiddleware = require("../../middleware/authMiddleware");
const { userRoles } = require("../../constans");

router.get(
    "/:id",
    authMiddleware([userRoles.user, userRoles.admin]),
    handlerWithRequestString(getTickets, schemas.getTicketsByUserId, schemasOfRequired.getTicketsByUserId)
);
router.post(
    "/",
    authMiddleware([userRoles.user, userRoles.admin]),
    handlerWithoutBody(postTicket, schemas.postTicket, schemasOfRequired.postTicket)
);
router.delete(
    "/:id",
    authMiddleware([userRoles.user, userRoles.admin]),
    handlerWithRequestString(deleteTicket, schemas.deleteTicket, schemasOfRequired.deleteTicket)
);

module.exports = router;
