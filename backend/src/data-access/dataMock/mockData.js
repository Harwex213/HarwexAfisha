const mock = require("./mock");
const mockConfig = require("config").get("dataMock");

const userRoles = ["USER", "ADMIN"];
const mockPassword = "0ffe1abd1a08215353c233d6e009613e95eec4253832a761af28ff37ac5a150c";
const users = {
    USER: [
        {
            username: "aleg",
            password: mockPassword,
            firstName: "Олег",
            lastName: "Капорцев",
            patronymic: "Андреевич",
        },
    ],
    ADMIN: [
        {
            username: "harwex",
            password: mockPassword,
            firstName: "Олег",
            lastName: "Капорцев",
            patronymic: "Андреевич",
        },
    ],
};

const getTime = (index, time) => {
    const dateStr = mockConfig.sessionsStart;
    const date = new Date(dateStr);
    const initialDay = Number(dateStr.slice(dateStr.length - 2, dateStr.length));
    date.setDate(initialDay + index);
    const [hours, minutes, seconds] = time.split(":");
    date.setHours(Number(hours));
    date.setMinutes(Number(minutes));
    date.setSeconds(Number(seconds));
    return date;
};
const getRandomIndex = (length) => {
    const index = Math.floor(Math.random() * length);
    console.log(index);
    return index;
};

module.exports = async (models) => {
    if (!mockConfig.mock) {
        return;
    }

    for (const model of Object.values(models)) {
        await model.destroy({
            where: {},
        });
    }

    for (const userRole of userRoles) {
        const createdRole = await models.userRole.create({
            name: userRole,
        });

        for (const user of users[userRole]) {
            await models.user.create({
                ...user,
                roleId: createdRole.id,
            });
        }
    }

    const { movies, movieSlogans, movieDirectors, movieAges, movieCountries, lorem } = mock;
    const createdMovies = [];
    for (const movie of movies) {
        createdMovies.push(
            await models.movie.create({
                ...movie,
                description: lorem.slice(0, Math.floor(Math.random() * (lorem.length - 50)) + 50),
                year: Math.floor(Math.random() * 32) + 1990,
                slogan: movieSlogans[getRandomIndex(movieSlogans.length)],
                country: movieCountries[getRandomIndex(movieCountries.length)],
                age: movieAges[getRandomIndex(movieAges.length)],
                director: movieDirectors[getRandomIndex(movieDirectors.length)],
                duration: Math.floor(Math.random() * 50) + 90,
            })
        );
    }

    const { cities } = mock;
    for (const city of cities) {
        const createdCity = await models.city.create({
            name: city,
        });

        const { cinemas } = mock;
        const cinemasCount = Math.floor(Math.random() * (cinemas.length - 1)) + 3;
        const createdCinemas = [];
        for (let i = 0; i < cinemasCount; i++) {
            createdCinemas.push(
                await models.cinema.create({
                    name: cinemas[getRandomIndex(cinemas.length)],
                    about: lorem,
                    cityId: createdCity.id,
                })
            );
        }

        for (const createdCinema of createdCinemas) {
            const movieIds = createdMovies.map((movie) => ({ id: movie.id }));
            const cinemaMoviesCount = Math.floor(Math.random() * (movieIds.length - 7)) + 7;
            const createdCinemaMovies = [];
            for (let i = 0; i < cinemaMoviesCount; i++) {
                const movieIdIndex = getRandomIndex(movieIds.length);
                const movieId = movieIds[movieIdIndex].id;
                createdCinemaMovies.push(
                    await models.cinemaMovie.create({
                        cinemaId: createdCinema.id,
                        movieId: movieId,
                        start: "2022-05-16",
                        finish: "2022-05-31",
                    })
                );
                movieIds.splice(movieIdIndex, 1);
            }

            const hallsCount = Math.floor(Math.random() * 2) + 1;
            for (let i = 0; i < hallsCount; i++) {
                const createdHall = await models.hall.create({
                    cinemaId: createdCinema.id,
                    rows: Math.floor(Math.random() * 11) + 3,
                    cols: Math.floor(Math.random() * 9) + 5,
                    name: "Зал " + (i + 1),
                });

                const { sessionTimes } = mock;
                for (let j = 0; j <= mockConfig.sessionsDays; j++) {
                    for (const sessionTime of sessionTimes) {
                        const time = getTime(j, sessionTime);
                        await models.session.create({
                            cinemaMovieId: createdCinemaMovies[getRandomIndex(createdCinemaMovies.length)].id,
                            hallId: createdHall.id,
                            time: time.toJSON(),
                            price: Math.floor(Math.random() * 15) + 16,
                            ticketsOrdered: 0,
                        });
                    }
                }
            }
        }
    }
};
