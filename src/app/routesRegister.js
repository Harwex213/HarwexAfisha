module.exports = (app) => {
    app.use((request, response, next) => {
        const error = new Error("Unsupported method");
        error.status = 400;
        error.stack = null;
        next(error);
    });
};
