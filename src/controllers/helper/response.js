const responseOk = (data, response) => {
    response.status(200).json({ data });
};

module.exports = {
    responseOk,
};
