const sql = require("mssql/msnodesqlv8");
const pools = require("./core/pools");
const { getPool } = require("./core/poolManager");

const poolsTickets = {
    getTicketsByUserId: pools.mainDatabase,
    insertTicket: pools.mainDatabase,
    deleteTicket: pools.mainDatabase,
};

const getTicketsByUserId = async ({ id }) => {
    const request = new sql.Request(await getPool(poolsTickets.getTicketsByUserId));

    request.input("id", sql.BigInt, id);
    return request.execute("getTicketsByUserId");
};

const insertTicket = async ({ userId, sessionId }) => {
    const request = new sql.Request(await getPool(poolsTickets.insertTicket));

    request.input("userId", sql.BigInt, userId);
    request.input("sessionId", sql.BigInt, sessionId);
    return request.execute("insertTicket");
};

const deleteTicket = async ({ id }) => {
    const request = new sql.Request(await getPool(poolsTickets.deleteTicket));

    request.input("id", sql.BigInt, id);
    return request.execute("deleteTicket");
};

module.exports = {
    getTicketsByUserId,
    insertTicket,
    deleteTicket,
};
