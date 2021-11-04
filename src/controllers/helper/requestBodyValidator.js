module.exports = (model, schemaOfRequired) => {
    const schemaOfRequiredArray = schemaOfRequired.reduce(
        (ac, a) => ({
            ...ac,
            [a]: "required",
        }),
        {}
    );

    for (const [key, value] of Object.entries(model)) {
        if (schemaOfRequiredArray[key] && value) {
            delete schemaOfRequiredArray[key];
        }
    }

    const leftFields = Object.entries(schemaOfRequiredArray);

    if (leftFields.length !== 0) {
        const error = new Error(`field ${leftFields[0][0]} must be set`);
        error.code = 400;
        throw error;
    }
};
