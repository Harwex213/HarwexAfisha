const throwNotFound = (message = "Not found") => {
    const error = new Error(message);
    error.status = 404;
    error.stack = null;
    throw error;
};

const throwUnauthenticated = (message = "Invalid login credentials") => {
    const error = new Error(message);
    error.status = 401;
    error.stack = null;
    throw error;
};

const throwBadRequest = (message = "Bad request") => {
    const error = new Error(message);
    error.status = 400;
    error.stack = null;
    throw error;
};

const throwModelInvalid = throwBadRequest;

const throwInternalError = (message = "Internal error") => {
    const error = new Error(message);
    error.status = 500;
    error.stack = null;
    throw error;
};

module.exports = {
    throwNotFound,
    throwUnauthenticated,
    throwBadRequest,
    throwModelInvalid,
    throwInternalError,
};
