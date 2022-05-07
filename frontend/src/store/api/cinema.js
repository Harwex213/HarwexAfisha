import api from "../api";

const cityApi = api.injectEndpoints({
    endpoints: (builder) => ({
        findCinema: builder.query({
            query: ({ name = "", cityId }) => ({
                url: "cinema/find",
                method: "POST",
                body: {
                    name: name,
                    cityId,
                },
            }),
            transformResponse: (response) => {
                const rows = response.rows;
                for (const row of rows) {
                    row.id = Number(row.id);
                    row.cityId = Number(row.cityId);
                }

                return {
                    ...response,
                    rows,
                };
            },
            providesTags: ["cinema"],
        }),
    }),
});

export const { useFindCinemaQuery } = cityApi;
