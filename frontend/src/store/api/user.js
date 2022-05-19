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
        changePassword: builder.mutation({
            query: ({ oldPassword, password, repeatPassword }) => ({
                url: "auth/changePassword",
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: { oldPassword, password, repeatPassword },
            }),
        }),
        changeInfo: builder.mutation({
            query: ({ username, firstName, lastName, patronymic }) => ({
                url: "user/changeInfo",
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: { username, firstName, lastName, patronymic },
            }),
        }),
    }),
});

export const {
    useCheckQuery,
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
    useChangePasswordMutation,
    useChangeInfoMutation,
} = userApi;
