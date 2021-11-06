const isRowsAffectedZero = (result) => {
    return result.rowsAffected[0] === 0;
};

const checkOnEntityFound = (result) => {
    if (isRowsAffectedZero(result)) {
        const error = new Error("Not found entity with such id");
        error.code = 400;
        throw error;
    }
};

module.exports = {
    isRowsAffectedZero,
    checkOnEntityFound,
};
