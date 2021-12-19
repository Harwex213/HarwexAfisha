import { privateApi } from "./api";

export const getPlacesChunk = ({ cityId }) => {
    const searchParams = new URLSearchParams();
    searchParams.set("cityId", cityId);

    return privateApi.get("places/chunk", { searchParams }).json();
};

export const postPlace = ({ name, about, cityId }) =>
    privateApi.post("places", { json: { name, about, cityId } }).json();

export const putPlace = ({ id, name, about, cityId }) =>
    privateApi.put("places", { json: { id, name, about, cityId } }).json();

export const deletePlace = ({ id }) => privateApi.delete(`places/${id}`).json();
