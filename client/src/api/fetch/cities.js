import { privateApi, publicApi } from "./api";

export const getCitiesChunk = () => privateApi.get("cities/chunk").json();

export const getPopularCities = () => publicApi.get("cities/popular").json();

export const postCity = ({ name, isPopular }) =>
    privateApi.post("cities", { json: { name, isPopular } }).json();

export const putCity = ({ id, name, isPopular }) => {
    privateApi.put("cities", { json: { id, name, isPopular } }).json();
};

export const deleteCity = ({ id }) => privateApi.delete(`cities/${id}`).json();
