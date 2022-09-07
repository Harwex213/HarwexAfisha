import { createSlice } from "@reduxjs/toolkit";
import { userRoles } from "../../constants/userRoles";

export const slice = createSlice({
    name: "user",
    initialState: {},
    reducers: {
        setUser: (state, { payload }) => {
            state.id = payload.id;
            state.username = payload.username;
            state.role = payload.role;
            state.firstName = payload.firstName;
            state.lastName = payload.lastName;
            state.patronymic = payload.patronymic;
            state.email = payload.email;
        },
        setUserChange: (state, { payload }) => {
            state.username = payload.username;
            state.firstName = payload.firstName;
            state.lastName = payload.lastName;
            state.patronymic = payload.patronymic;
            state.email = payload.email;
        },
        logout: (state) => {
            state.id = -1;
            state.username = "Guest";
            state.role = userRoles.GUEST;
            state.firstName = "???";
            state.lastName = "???";
            state.patronymic = "???";
            state.email = "???";
        },
    },
});

export const { setUser, logout, setUserChange } = slice.actions;

export const selectUser = (state) => state.user;

export default slice.reducer;
