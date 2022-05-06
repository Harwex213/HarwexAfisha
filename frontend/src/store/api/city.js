import api from "../api";

const cityApi = api.injectEndpoints({
    endpoints: (builder) => ({
        findCity: builder.query({
            query: ({ city }) => ({
                url: "city/find",
                method: "POST",
                body: city ? { city } : {},
            }),
            transformResponse: (response) => {
                const rows = response.rows;
                for (const row of rows) {
                    row.id = Number(row.id);
                }

                return {
                    ...response,
                    rows,
                };
            },
        }),
    }),
});

export const { useFindCityQuery } = cityApi;
