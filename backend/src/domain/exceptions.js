module.exports.throwForbidden = (message = "Forbidden") => {
    const error = new Error(message);
    error.status = 403;
    throw error;
};

module.exports.throwNotFound = (message = "Not found") => {
    const error = new Error(message);
    error.status = 404;
    throw error;
};

module.exports.throwBadRequest = (message = "Bad request") => {
    const error = new Error(message);
    error.status = 400;
    throw error;
};
