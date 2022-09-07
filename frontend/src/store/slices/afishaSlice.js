import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import { userScreenRoutes } from "../../constants/userScreenRoutes";

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
        currentRoute: userScreenRoutes.AFISHA,
    },
    reducers: {
        setNoneRoute: (state) => {
            state.currentRoute = userScreenRoutes.NONE;
        },
        setAfishaRoute: (state) => {
            state.currentRoute = userScreenRoutes.AFISHA;
        },
        setCity: (state, { payload }) => {
            state.city = payload.city;
        },
        setDate: (state, { payload }) => {
            state.date = payload.date;
        },
    },
});

export const { setCity, setDate, setAfishaRoute, setNoneRoute } = slice.actions;

export const selectCity = (state) => state.afisha.city;
export const selectDate = (state) => state.afisha.date;
export const selectCurrentRoute = (state) => state.afisha.currentRoute;

export default slice.reducer;
