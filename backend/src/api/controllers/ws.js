const clients = {};
let i = 0;

module.exports = async (fastify) => {
    fastify.get("/ws-api/tickets", { websocket: true }, (connection) => {
        connection.socket.on("close", () => delete clients[i.toString()]);
        clients[(i++).toString()] = connection.socket;
    });
};

setInterval(() => {
    for (const client of Object.values(clients)) {
        client.send(JSON.stringify({ id: new Date().toJSON() }));
    }
}, 1000);
