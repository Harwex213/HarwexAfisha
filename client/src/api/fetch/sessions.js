import { publicApi } from "./api";
import dateFormat from "dateformat";

export const getSessionsByEventCityDate = ({ date, eventId, cityId }) => {
    const searchParams = new URLSearchParams();
    searchParams.set("cityId", cityId);
    searchParams.set("eventId", eventId);
    searchParams.set("date", dateFormat(date, "yyyy-mm-dd"));

    return publicApi.get("sessions", { searchParams }).json();
};
