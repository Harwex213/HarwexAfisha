import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

export const slice = createSlice({
    name: "afisha",
    initialState: {
        city: null,
        date: moment().format("YYYY-MM-DD"),
    },
    reducers: {
        setCity: (state, { payload }) => {
            state.city = payload.city;
        },
        setDate: (state, { payload }) => {
            state.date = payload.date;
        },
    },
});

export const { setCity, setDate } = slice.actions;

export const selectCity = (state) => state.afisha.city;
export const selectDate = (state) => state.afisha.date;

export default slice.reducer;
