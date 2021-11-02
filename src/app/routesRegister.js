module.exports = (app) => {
    app.use((request, response, next) => {
        const error = new Error("Unhandled method");
        error.status = 400;
        error.stack = null;
        next(error);
    });
};
