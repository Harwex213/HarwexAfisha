import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
    name: "user",
    initialState: {},
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
