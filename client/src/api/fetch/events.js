import { privateApi, publicApi } from "./api";
import dateFormat from "dateformat";

export const getEventsChunk = () => privateApi.get("events/chunk").json();

export const getEventsByCityDate = ({ cityId, date }) => {
    const searchParams = new URLSearchParams();
    searchParams.set("cityId", cityId);
    searchParams.set("date", dateFormat(date, "yyyy-mm-dd"));

    return publicApi.get("events", { searchParams }).json();
};

export const getEvent = ({ id }) => publicApi.get(`events/${id}`).json();

export const postEvent = ({ name, description }) =>
    privateApi.post("events", { json: { name, description } }).json();

export const putEvent = ({ id, name, description }) =>
    privateApi.put("events", { json: { id, name, description } }).json();

export const deleteEvent = ({ id }) => privateApi.delete(`events/${id}`).json();
