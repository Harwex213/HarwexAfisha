import { publicApi } from "./api";
import dateFormat from "dateformat";

export const getEventsByCityDate = ({ cityId, date }) => {
    const searchParams = new URLSearchParams();
    searchParams.set("cityId", cityId);
    searchParams.set("date", dateFormat(date, "yyyy-mm-dd"));

    return publicApi.get("events", { searchParams }).json();
};

export const getEvent = ({ id }) => publicApi.get(`events/${id}`).json();
