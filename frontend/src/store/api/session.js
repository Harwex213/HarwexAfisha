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
    }),
});

export const { useGetSessionsByHallAndDateQuery } = sessionApi;
