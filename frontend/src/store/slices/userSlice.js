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
        },
        logout: (state) => {
            state.id = -1;
            state.username = "Guest";
            state.role = userRoles.GUEST;
        },
    },
});

export const { setUser, logout } = slice.actions;

export const selectUser = (state) => state.user;

export default slice.reducer;
