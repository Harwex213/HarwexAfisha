const { userRoles } = require("../index").constants;
const getSchemas = require("../index").schemas;
const { mapCreate } = require("../index").mapper;
const { emitter, mailTransporter } = require("../index");
const { throwBadRequest } = require("../index").exceptions;
const { executeTransaction } = require("../index").connection;
const genericProvider = require("../index").genericProvider;
const sessionProvider = require("../index").sessionProvider;
const mailFrom = require("config").get("mailTransporter.auth.user");

const handler = async ({ body, userContext }) => {
    const result = await executeTransaction(async (transaction) => {
        const { ticket } = body;
        const session = await genericProvider.getById({
            modelName: "session",
            id: body.ticket.sessionId,
            transaction,
        });
        const hall = await genericProvider.getById({
            modelName: "hall",
            id: session.hallId,
            transaction,
        });

        const maxTicketsAmount = hall.rows * hall.cols;
        if (session.ticketsOrdered === maxTicketsAmount) {
            throwBadRequest("All tickets ordered");
        }
        if (ticket.row < 0 || ticket.row > hall.rows) {
            throwBadRequest("Ticket row must be in range of rows of hall");
        }
        if (ticket.position < 0 || ticket.position > hall.cols) {
            throwBadRequest("Ticket position must be in range of rows of hall");
        }

        const [rowsAffected] = await sessionProvider.incrementOrderedTickets({
            id: session.id,
            amount: session.ticketsOrdered,
            transaction,
        });
        if (rowsAffected === 0) {
            throw new Error("incrementOrderedTickets - rows affected zero");
        }

        try {
            const createdTicket = await genericProvider.create({
                modelName: "ticket",
                instance: {
                    ...ticket,
                    userId: userContext.id,
                },
                transaction,
            });
            emitter.emit("ticket/onOrder", createdTicket);

            return createdTicket;
        } catch (e) {
            throwBadRequest("Ticket to this session with such row and position already ordered");
        }
    });

    if (!userContext.email) {
        return result;
    }

    const { emailInfo } = body;
    const mailOptions = {
        from: mailFrom,
        to: userContext.email,
        subject: "Harwex Tickets - Ordering tickets info",
        html:
            "<h1>Harwex Tickets - Ordering tickets info.</h1>" +
            `<p>You ordered a ticket for time <span style='font-weight: bold'>${emailInfo.time}</span> to the movie ` +
            `<span style='font-weight: bold'>${emailInfo.movieName}</span></p>` +
            `<p>Cinema <span style='font-weight: bold'>${emailInfo.cinemaName}</span>, city ` +
            `<span style='font-weight: bold'>${emailInfo.cityName}</span></p>` +
            `<p style='font-weight: bold'>Hall: ${emailInfo.hallName}, row ${emailInfo.row}, seat ${emailInfo.seat}</p>` +
            `<h3>Price: ${emailInfo.price}</h3>`,
    };
    mailTransporter.sendMail(mailOptions, (error) => console.log(error));
    return result;
};

const schema = {
    title: "Ticket",
    type: "object",
    properties: {
        ticket: {},
        emailInfo: {
            type: "object",
            properties: {
                time: { type: "string" },
                movieName: { type: "string" },
                cinemaName: { type: "string" },
                cityName: { type: "string" },
                hallName: { type: "string" },
                row: { type: "integer", format: "int32" },
                seat: { type: "integer", format: "int32" },
                price: { type: "string" },
            },
            required: ["time", "movieName", "cinemaName", "cityName", "hallName", "row", "seat", "price"],
        },
    },
    required: ["ticket", "emailInfo"],
};

module.exports = async () => {
    const { ticket } = await getSchemas();
    schema.properties.ticket = await mapCreate(ticket);

    return {
        handler,
        expectedRoles: [userRoles.USER],
        schema: schema,
    };
};
