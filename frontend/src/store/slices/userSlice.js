import { createSlice } from "@reduxjs/toolkit";
import { userRoles } from "../../constants/userRoles";

export const slice = createSlice({
    name: "user",
    initialState: {
        id: -1,
        username: "Guest",
        role: userRoles.GUEST,
    },
    reducers: {
        setUser: (state, { payload }) => {
            state.id = payload.id;
            state.username = payload.username;
            state.role = payload.role;
        },
    },
});

export const { setUser } = slice.actions;

export const selectUser = (state) => state.user;

export default slice.reducer;
