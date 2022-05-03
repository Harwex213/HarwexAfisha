import api from "../api";

const genericApi = api.injectEndpoints({
    endpoints: (builder) => ({
        get: builder.query({
            query: ({ model, page }) => ({
                url: model + "/get",
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: {
                    offset: Number(page),
                },
            }),
        }),
    }),
});

export const { useGetQuery } = genericApi;
