const config = require("config");
const cinemaMoviesService = require("./domain/services/cinemaMovieService");
const sessionsService = require("./domain/services/sessionService");
const getSchemasContext = require("./domain/schemas/ajv");
const initApi = require("./api/app");
const getPorts = require("./domain/ports");

(async () => {
    try {
        await initApi();
        // const { schemas } = await getSchemasContext();
        // console.log(schemas.cinemaMovie);
        // console.log(await ports.session.getSessionAvailableTicketsAmount({ body: { sessionId: 1 } }));
    } catch (e) {
        console.log("Error!!!", e);
    }

    // const { schemas } = await getSchemasContext();
    //
    // console.log(schemas);
    // fastify.post("/");
    //
    // await fastify.listen(3000);
    // const { ajv, schemas } = await getSchemasContext();
    //
    // console.log(schemas.cinema);
    //
    // console.log(
    //     ajv.validate("city1", {
    //         id: "asda",
    //         name: "asda",
    //     })
    // );
    // console.log(ajv.errorsText());
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
