import { useQuery } from "react-query";
import { getPopularCities } from "../fetch/cities";

export const usePopularCities = ({ onSuccess = (data) => data }) => {
    return useQuery(["cities", { type: "popular" }], getPopularCities, {
        onSuccess: onSuccess,
    });
};
