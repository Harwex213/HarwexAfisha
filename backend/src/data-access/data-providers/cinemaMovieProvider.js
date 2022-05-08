const { Op, Sequelize } = require("sequelize");
const getContext = require("../sequelize");

module.exports.getMoviesByCityAndDate = async ({ cityId, date, transaction = null }) => {
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
        transaction,
        raw: true,
        nest: true,
    });

    return cinemaMovies.map((cinemaMovie) => cinemaMovie.movie);
};

module.exports.getCinemasByCityDateMovie = async ({ cityId, movieId, date, transaction = null }) => {
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
        transaction,
        raw: true,
        nest: true,
    });

    return cinemaMovies.map((cinemaMovie) => cinemaMovie.cinema);
};

module.exports.getMoviesByCinema = async ({ cinemaId, offset, transaction = null }) => {
    const { models } = await getContext();
    const { cinemaMovie, movie } = models;

    const cinemaMovies = await cinemaMovie.findAndCountAll({
        attributes: ["id", "start", "finish"],
        where: {
            cinemaId: cinemaId,
        },
        include: [
            {
                model: movie,
                as: "movie",
                attributes: ["id", "name"],
            },
        ],
        order: [["start", "DESC"]],
        transaction,
        raw: true,
        nest: true,
        limit: 15,
        offset: offset * 15,
    });

    const rows = cinemaMovies.rows.map((row) => {
        const newRow = row;
        newRow.movieId = row.movie.id;
        newRow.movieName = row.movie.name;
        delete newRow.movie;
        return newRow;
    });

    return {
        count: cinemaMovies.count,
        rows,
    };
};
