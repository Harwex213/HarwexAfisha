import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const getDateInitialValue = () => {
    let datePersist = JSON.parse(localStorage.getItem("afisha/date"));
    if (!datePersist || moment(datePersist) < moment()) {
        datePersist = moment().format("YYYY-MM-DD");
        localStorage.removeItem("afisha/date");
    }

    return datePersist;
};

export const slice = createSlice({
    name: "afisha",
    initialState: {
        city: null,
        date: getDateInitialValue(),
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
