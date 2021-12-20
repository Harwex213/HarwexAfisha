const sql = require("mssql/msnodesqlv8");
const poolManager = require("../pool/pool");
const poolTypes = require("../pool/poolTypes");

const getTicketsByUserId = async ({ id }) => {
    const request = poolManager.newRequest(poolTypes.getTicketsByUserId, (request) => {
        request.input("userId", sql.BigInt, id);
    });

    return poolManager.executeRequest("s_user.getTicketsByUserId", request);
};

const insertTicket = async ({ userId, sessionId }) => {
    const request = poolManager.newRequest(poolTypes.insertTicket, (request) => {
        request.input("userId", sql.BigInt, userId);
        request.input("sessionId", sql.BigInt, sessionId);
    });

    return poolManager.executeRequest("s_user.insertTicket", request);
};

const deleteTicket = async ({ id, userId }) => {
    const request = poolManager.newRequest(poolTypes.deleteTicket, (request) => {
        request.input("id", sql.BigInt, id);
        request.input("userId", sql.BigInt, userId);
    });

    return poolManager.executeRequest("s_user.deleteTicket", request);
};

module.exports = {
    getTicketsByUserId,
    insertTicket,
    deleteTicket,
};
