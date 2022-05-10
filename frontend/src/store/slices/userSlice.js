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
        },
        logout: (state) => {
            state.id = -1;
            state.username = "Guest";
            state.role = userRoles.GUEST;
            state.firstName = "???";
            state.lastName = "???";
        },
    },
});

export const { setUser, logout } = slice.actions;

export const selectUser = (state) => state.user;

export default slice.reducer;
