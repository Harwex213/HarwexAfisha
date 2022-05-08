import api from "../api";

const cinemaMovieApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getMoviesByCinema: builder.query({
            query: ({ cinemaId, page }) => ({
                url: "cinemaMovie/getMoviesByCinema",
                method: "POST",
                body: {
                    cinemaId,
                    offset: page,
                },
            }),
            transformResponse: (response) => {
                const rows = response.rows;
                for (const row of rows) {
                    row.id = Number(row.id);
                    row.movieId = Number(row.movieId);
                }

                return {
                    ...response,
                    rows,
                };
            },
            providesTags: ["cinemaMovie"],
        }),
        findExceptMoviesByCinema: builder.query({
            query: ({ cinemaId, movieName = "" }) => ({
                url: "cinemaMovie/findExceptMoviesByCinema",
                method: "POST",
                body: {
                    cinemaId,
                    movieName,
                },
            }),
            transformResponse: (response) => {
                const rows = response;
                for (const row of rows) {
                    row.id = Number(row.id);
                }

                return rows;
            },
            providesTags: ["cinemaMovie"],
        }),
        findMoviesByCinemaDate: builder.query({
            query: ({ movieName = "", cinemaId, date }) => ({
                url: "cinemaMovie/findMoviesByCinemaDate",
                method: "POST",
                body: {
                    name: movieName,
                    cinemaId,
                    date,
                },
            }),
            transformResponse: (response) => {
                const rows = response;
                for (const row of rows) {
                    row.id = Number(row.id);
                }

                return rows;
            },
            providesTags: ["cinemaMovie"],
        }),
    }),
});

export const { useGetMoviesByCinemaQuery, useFindExceptMoviesByCinemaQuery, useFindMoviesByCinemaDateQuery } =
    cinemaMovieApi;
