const { throwNotFound } = require("../../util/prepareError");

const isRowsReceivedZero = (result) => {
    return result.recordset.length === 0;
};

const isRowsAffectedZero = (result) => {
    return result.rowsAffected[0] === 0;
};

const validateOnEntityWasGet = (result, errorMessage) => {
    if (isRowsReceivedZero(result)) {
        throwNotFound(errorMessage);
    }
};

const validateOnEntityUpdated = (result, errorMessage) => {
    if (isRowsAffectedZero(result)) {
        throwNotFound(errorMessage);
    }
};

const validateOnEntityDelete = validateOnEntityUpdated;

module.exports = {
    isRowsReceivedZero,
    isRowsAffectedZero,
    validateOnEntityWasGet,
    validateOnEntityUpdated,
    validateOnEntityDelete,
};
