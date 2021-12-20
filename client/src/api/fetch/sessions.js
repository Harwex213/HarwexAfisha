import { privateApi, publicApi } from "./api";
import dateFormat from "dateformat";

export const getSessionsChunk = ({ eventPlaceId }) => {
    const searchParams = new URLSearchParams();
    searchParams.set("eventPlaceId", eventPlaceId);

    return privateApi.get("sessions/chunk", { searchParams }).json();
};

export const getSessionsByEventCityDate = ({ date, eventId, cityId }) => {
    const searchParams = new URLSearchParams();
    searchParams.set("cityId", cityId);
    searchParams.set("eventId", eventId);
    searchParams.set("date", dateFormat(date, "yyyy-mm-dd"));

    return publicApi.get("sessions", { searchParams }).json();
};

export const postSession = ({ eventPlaceId, time, price, ticketsAmount }) =>
    privateApi.post("sessions", { json: { eventPlaceId, time, price, ticketsAmount } }).json();

export const putSession = ({ id, eventPlaceId, time, price, ticketsAmount }) =>
    privateApi.put("sessions", { json: { id, eventPlaceId, time, price, ticketsAmount } }).json();

export const deleteSession = ({ id }) => privateApi.delete(`sessions/${id}`).json();
