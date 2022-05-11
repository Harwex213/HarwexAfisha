import api from "../api";

const sessionApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getSessionsByHallAndDate: builder.query({
            query: ({ hallId, date, includeMovie = false }) => ({
                url: "session/getSessionsByHallAndDate",
                method: "POST",
                body: { date, hallId, includeMovie },
            }),
            transformResponse: (response) => {
                const rows = response;
                for (const row of rows) {
                    row.id = Number(row.id);
                    row.cinemaMovieId = Number(row.cinemaMovieId);
                    row.hallId = Number(row.hallId);
                    row.movieId = Number(row.movieId);
                }

                return {
                    ...response,
                    rows,
                };
            },
            providesTags: ["session"],
        }),
        getSessionsByCinemaDateMovie: builder.query({
            query: ({ cinemaId, movieId, date }) => ({
                url: "session/getSessionsByCinemaDateMovie",
                method: "POST",
                body: { cinemaId: Number(cinemaId), movieId: Number(movieId), date },
            }),
            transformResponse: (response) => {
                const rows = response;
                for (const row of rows) {
                    row.id = Number(row.id);
                    row.cinemaMovieId = Number(row.cinemaMovieId);
                    row.hallId = Number(row.hallId);
                }

                return rows;
            },
            providesTags: ["session"],
        }),
        getSessionOrderedSeats: builder.query({
            query: ({ sessionId }) => ({
                url: "session/getSessionOrderedSeats",
                method: "POST",
                body: { sessionId: Number(sessionId) },
            }),
            providesTags: ["session"],
        }),
    }),
});

export const {
    useGetSessionsByHallAndDateQuery,
    useGetSessionsByCinemaDateMovieQuery,
    useGetSessionOrderedSeatsQuery,
} = sessionApi;
