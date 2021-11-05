const router = require("express").Router();
const { getTickets, postTicket, deleteTicket, schemas, schemasOfRequired } = require("./ticketsController");
const { handlerWithoutBody, handlerWithRequestString } = require("../helper/baseHandlers");

router.get(
    "/:id",
    handlerWithRequestString(getTickets, schemas.getTicketsByUserId, schemasOfRequired.getTicketsByUserId)
);
router.post("/", handlerWithoutBody(postTicket, schemas.postTicket, schemasOfRequired.postTicket));
router.delete(
    "/:id",
    handlerWithRequestString(deleteTicket, schemas.deleteTicket, schemasOfRequired.deleteTicket)
);

module.exports = router;
