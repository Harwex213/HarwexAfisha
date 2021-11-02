module.exports = (app) => {
    app.use((error, request, response, next) => {
        response.status(error.status || 500);
        response.json({
            error: {
                message: error.message,
            },
        });
    });
};
