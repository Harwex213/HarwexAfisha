import { useQuery } from "react-query";
import { getPopularCities } from "../fetch/cities";

export const usePopularCities = () => {
    return useQuery(["cities", { type: "popular" }], getPopularCities);
};
