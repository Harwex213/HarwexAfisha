const throwNotFound = (message) => {
    const error = new Error(message ?? "Not found");
    error.status = 404;
    error.stack = null;
    throw error;
};

const throwUnauthenticated = (message) => {
    const error = new Error(message ?? "Invalid login credentials");
    error.status = 401;
    error.stack = null;
    throw error;
};

const throwBadRequest = (message) => {
    const error = new Error(message ?? "Bad request");
    error.status = 400;
    error.stack = null;
    throw error;
};

const throwModelInvalid = throwBadRequest;

module.exports = {
    throwNotFound,
    throwUnauthenticated,
    throwBadRequest,
    throwModelInvalid,
};
