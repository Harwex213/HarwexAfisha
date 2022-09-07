import api from "../api";

const ratingApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getRatings: builder.query({
            query: ({ kinopoiskId }) => ({
                url: `https://kinopoiskapiunofficial.tech/api/v2.2/films/${kinopoiskId}`,
                method: "GET",
                headers: {
                    "X-API-KEY": "677568c3-4982-42ac-a985-8d22278d1e96",
                    "Content-Type": "application/json",
                },
                credentials: "omit",
            }),
        }),
    }),
});

export const { useGetRatingsQuery } = ratingApi;
