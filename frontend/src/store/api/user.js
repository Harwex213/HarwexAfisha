import api from "../api";

const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        check: builder.query({
            query: () => ({
                url: "auth/check",
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: {},
            }),
        }),
        login: builder.mutation({
            query: ({ username, password }) => ({
                url: "auth/login",
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: { username, password },
            }),
        }),
        register: builder.mutation({
            query: (body) => ({
                url: "auth/register",
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: body,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: "auth/logout",
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: {},
            }),
        }),
    }),
});

export const { useCheckQuery, useLoginMutation, useRegisterMutation, useLogoutMutation } = userApi;
