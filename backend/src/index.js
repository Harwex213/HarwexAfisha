const config = require("config");
const cinemaMoviesService = require("./services/cinemaMoviesService");
const sessionsService = require("./services/sessionsService");
const getAjv = require("./schemas/ajv");

(async () => {
    const ajv = await getAjv();

    console.log(
        ajv.validate("city", {
            id: 1,
        })
    );
    console.log(ajv.errorsText());

    // console.log(
    //     await sessionsService.getSessionAvailableTicketsAmount({
    //         sessionId: 1,
    //     })
    // );
    //
    // console.log(
    //     await cinemaMoviesService.getCinemasByCityDateMovie({
    //         cityId: 1,
    //         movieId: 2,
    //         date: Date.parse("2000-01-11"),
    //     })
    // );
})();
