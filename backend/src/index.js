const config = require("config");
const cinemaMoviesService = require("./services/cinemaMoviesService");
const sessionsService = require("./services/sessionsService");

(async () => {
    console.log(
        await sessionsService.getSessionAvailableTicketsAmount({
            sessionId: 1,
        })
    );

    // console.log(
    //     await cinemaMovieProvider.getCinemasByCityDateMovie({
    //         cityId: 1,
    //         movieId: 2,
    //         date: Date.parse("2000-01-11"),
    //     })
    // );
})();
