import { publicApi } from "./api";

export const getPopularCities = () => publicApi.get("cities/popular").json();
