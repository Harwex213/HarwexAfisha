import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import apiConfig from "../constants/apiConfig";
import { logout } from "./slices/userSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: apiConfig.baseUrl,
    credentials: "include",
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 403) {
        const refreshResult = await baseQuery(
            {
                method: "POST",
                url: "auth/refresh",
                body: {},
            },
            api,
            extraOptions
        );

        if (refreshResult.data) {
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logout());
        }
    }
    return result;
};

const api = createApi({
    reducerPath: "api",
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({}),
    tagTypes: ["city", "movie", "user", "cinema", "cinemaMovie", "hall", "session", "ticket"],
});

export default api;
