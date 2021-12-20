import { privateApi } from "./api";

export const getEventPlacesChunk = ({ placeId }) => {
    const searchParams = new URLSearchParams();
    searchParams.set("placeId", placeId);

    return privateApi.get("eventPlaces/chunk", { searchParams }).json();
};

export const postEventPlace = ({ placeId, eventId }) =>
    privateApi.post("eventPlaces", { json: { placeId, eventId } }).json();

export const deleteEventPlace = ({ id }) => privateApi.delete(`eventPlaces/${id}`).json();
