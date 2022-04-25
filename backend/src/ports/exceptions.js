module.exports.throwForbidden = (message = "Forbidden.") => {
    const error = new Error(message);
    error.status = 403;
    throw error;
};
