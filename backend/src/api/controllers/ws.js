const events = require("../../domain/events");
const clients = {};

module.exports = async (fastify) => {
    fastify.get("/ws-api/tickets", { websocket: true }, (connection, request) => {
        const sessionId = request.query.sessionId;
        if (!sessionId) {
            connection.socket.close();
        }

        const requestId = String(request.id);
        clients[sessionId] = clients[sessionId] ?? {};
        clients[sessionId][requestId] = connection.socket;
        connection.socket.on("close", () => {
            const sessionClients = clients[sessionId];
            delete sessionClients[requestId];

            if (!Object.keys(sessionClients).length) {
                delete clients[sessionId];
            }
        });
    });
};

events.on("ticket/onOrder", ({ sessionId, row, position }) => {
    try {
        const sessionClients = clients[sessionId];

        for (const client of Object.values(sessionClients)) {
            client.send(
                JSON.stringify({
                    type: "ordered",
                    seat: [row, position],
                })
            );
        }
    } catch (e) {
        // ignored
    }
});

events.on("ticket/onReturn", ({ sessionId, row, position }) => {
    try {
        const sessionClients = clients[sessionId];

        for (const client of Object.values(sessionClients)) {
            client.send(
                JSON.stringify({
                    type: "returned",
                    seat: [row, position],
                })
            );
        }
    } catch (e) {
        // ignored
    }
});
