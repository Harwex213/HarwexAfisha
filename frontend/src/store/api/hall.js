import api from "../api";

const hallApi = api.injectEndpoints({
    endpoints: (builder) => ({
        findHall: builder.query({
            query: ({ name = "", cinemaId }) => ({
                url: "hall/find",
                method: "POST",
                body: {
                    name: name,
                    cinemaId,
                },
            }),
            transformResponse: (response) => {
                const rows = response.rows;
                for (const row of rows) {
                    row.id = Number(row.id);
                    row.cinemaId = Number(row.cinemaId);
                }

                return {
                    ...response,
                    rows,
                };
            },
            providesTags: ["hall"],
        }),
    }),
});

export const { useFindHallQuery } = hallApi;
