const isRowsAffectedZero = (result) => {
    return result.rowsAffected[0] === 0;
};

const checkOnUpdated = (result) => {
    if (isRowsAffectedZero(result)) {
        const error = new Error("Not found entity with such id");
        error.code = 400;
        throw error;
    }
};

const checkOnDelete = (result) => {
    if (isRowsAffectedZero(result)) {
        const error = new Error("Not found entity with such id");
        error.code = 400;
        throw error;
    }
};

module.exports = {
    isRowsAffectedZero,
    checkOnUpdated,
    checkOnDelete,
};
