const { Op, Sequelize } = require("sequelize");
const getContext = require("../sequelize");

module.exports.getMoviesByCityAndDate = async ({ cityId, date }) => {
    const { models } = await getContext();
    const { cinemaMovie, cinema, movie } = models;

    const cinemaMovies = await cinemaMovie.findAll({
        attributes: [],
        where: {
            finish: { [Op.gte]: date },
        },
        include: [
            {
                model: cinema,
                as: "cinema",
                where: { cityId: cityId },
                attributes: [],
            },
            {
                model: movie,
                as: "movie",
                attributes: [
                    [Sequelize.fn("DISTINCT", Sequelize.col("movie.name")), "name"],
                    "id",
                    "description",
                ],
            },
        ],
        raw: true,
        nest: true,
    });

    return cinemaMovies.map((cinemaMovie) => cinemaMovie.movie);
};

module.exports.getCinemasByCityDateMovie = async ({ cityId, movieId, date }) => {
    const { models } = await getContext();
    const { cinemaMovie, cinema } = models;

    const cinemaMovies = await cinemaMovie.findAll({
        attributes: [],
        where: {
            finish: { [Op.gte]: date },
            movieId: movieId,
        },
        include: [
            {
                model: cinema,
                as: "cinema",
                where: { cityId: cityId },
            },
        ],
        raw: true,
        nest: true,
    });

    return cinemaMovies.map((cinemaMovie) => cinemaMovie.cinema);
};