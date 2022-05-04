import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import apiConfig from "../constants/apiConfig";

const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: apiConfig.baseUrl,
        credentials: "include",
    }),
    endpoints: () => ({}),
});

export default api;
