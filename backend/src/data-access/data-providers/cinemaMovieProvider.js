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

module.exports.findExceptMoviesByCinema = async ({ cinemaId, movieName = "", transaction = null }) => {
    const { models } = await getContext();
    const { cinemaMovie, movie } = models;

    const movies = await movie.findAll({
        where: {
            name: {
                [Op.like]: `${movieName}%`,
            },
        },
        limit: 30,
        offset: 0,
        transaction,
        raw: true,
        nest: true,
    });

    const cinemaMovies = await cinemaMovie.findAll({
        where: {
            cinemaId,
        },
        transaction,
        raw: true,
        nest: true,
    });

    return movies.filter(
        (movie) => cinemaMovies.findIndex((cinemaMovie) => cinemaMovie.movieId === movie.id) === -1
    );
};

module.exports.findMoviesByCinemaDate = async ({ name = "", cinemaId, date, transaction = null }) => {
    const { models } = await getContext();
    const { cinemaMovie, movie } = models;

    const cinemaMovies = await cinemaMovie.findAll({
        attributes: [],
        where: {
            cinemaId: cinemaId,
            [Op.and]: {
                finish: { [Op.gte]: date },
                start: { [Op.lte]: date },
            },
        },
        include: [
            {
                model: movie,
                as: "movie",
                attributes: ["id", "name"],
                where: {
                    name: {
                        [Op.like]: `${name}%`,
                    },
                },
            },
        ],
        transaction,
        raw: true,
        nest: true,
        limit: 30,
        offset: 0,
    });

    return cinemaMovies.map((row) => row.movie);
};
