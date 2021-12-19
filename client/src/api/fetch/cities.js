import { privateApi, publicApi } from "./api";

export const getCitiesChunk = () => privateApi.get("cities/chunk").json();

export const getPopularCities = () => publicApi.get("cities/popular").json();

export const postCity = ({ name }) => privateApi.post("cities", { json: { name } }).json();

export const putCity = ({ id, name }) => privateApi.put("cities", { json: { id, name } }).json();

export const deleteCity = ({ id }) => privateApi.delete(`cities/${id}`).json();
