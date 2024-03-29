import api from "../api";

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const tags = ["city", "movie", "cinema", "cinemaMovie", "hall", "session", "ticket"];

const genericApi = {};

for (const tag of tags) {
    genericApi[tag] = api.injectEndpoints({
        endpoints: (builder) => ({
            ["getById" + capitalizeFirstLetter(tag)]: builder.query({
                query: ({ id }) => ({
                    url: tag + "/getById",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8",
                    },
                    body: {
                        id: Number(id),
                    },
                }),
                transformResponse: (response) => {
                    return {
                        ...response,
                        id: Number(response.id),
                    };
                },
                providesTags: [tag],
            }),
            ["get" + capitalizeFirstLetter(tag)]: builder.query({
                query: ({ page, where = {} }) => ({
                    url: tag + "/get",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8",
                    },
                    body: {
                        offset: Number(page),
                        where,
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
                providesTags: [tag],
            }),
            ["post" + capitalizeFirstLetter(tag)]: builder.mutation({
                query: ({ ...body }) => ({
                    url: tag + "/create",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8",
                    },
                    body: {
                        ...body,
                    },
                }),
                invalidatesTags: [tag],
            }),
            ["put" + capitalizeFirstLetter(tag)]: builder.mutation({
                query: (body) => ({
                    url: tag + "/update",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8",
                    },
                    body,
                }),
                invalidatesTags: [tag],
            }),
            ["delete" + capitalizeFirstLetter(tag)]: builder.mutation({
                query: ({ id }) => ({
                    url: tag + "/delete",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8",
                    },
                    body: {
                        id,
                    },
                }),
                invalidatesTags: [tag],
            }),
        }),
    });
}

export const { city, movie, cinema, cinemaMovie, hall, session, ticket } = genericApi;
