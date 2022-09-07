import api from "../api";

const cityApi = api.injectEndpoints({
    endpoints: (builder) => ({
        findCity: builder.query({
            query: ({ name = "" }) => ({
                url: "city/find",
                method: "POST",
                body: {
                    name: name,
                },
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
            providesTags: ["city"],
        }),
    }),
});

export const { useFindCityQuery } = cityApi;
