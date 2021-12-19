import { privateApi } from "./api";

export const getPlacesChunk = ({ cityId }) => {
    const searchParams = new URLSearchParams();
    searchParams.set("cityId", cityId);

    return privateApi.get("places/chunk", { searchParams }).json();
};

export const postPlace = ({ name, description }) =>
    privateApi.post("places", { json: { name, description } }).json();

export const putPlace = ({ id, name, description }) =>
    privateApi.put("places", { json: { id, name, description } }).json();

export const deletePlace = ({ id }) => privateApi.delete(`places/${id}`).json();
