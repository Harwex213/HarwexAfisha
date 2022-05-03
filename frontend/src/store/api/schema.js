import api from "../api";

const schemaApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getSchema: builder.query({
            query: ({ schemaName }) => ({
                url: "schema/getByName",
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: {
                    schemaName,
                },
            }),
        }),
    }),
});

export const { useGetSchemaQuery } = schemaApi;
