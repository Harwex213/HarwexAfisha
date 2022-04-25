const config = require("config");
const cinemaMoviesService = require("./services/cinemaMovieService");
const sessionsService = require("./services/sessionService");
const getSchemasContext = require("./schemas/ajv");
const fastify = require("fastify")({ logger: true });
const getPorts = require("./ports/ports");

(async () => {
    try {
        const { schemas } = await getSchemasContext();
        console.log(schemas.cinemaMovie);

        const ports = await getPorts();
        console.log(ports);
        console.log(await ports.session.getSessionAvailableTicketsAmount({ body: { sessionId: 1 } }));
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
