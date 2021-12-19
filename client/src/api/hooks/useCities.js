import { useMutation, useQuery } from "react-query";
import { getPopularCities, getCitiesChunk, postCity, putCity, deleteCity } from "../fetch/cities";

export const usePopularCities = ({ onSuccess = (data) => data }) => {
    return useQuery(["cities", { type: "popular" }], getPopularCities, {
        onSuccess: onSuccess,
    });
};

export const useCitiesChunk = () => {
    return useQuery(["cities", { type: "chunk" }], getCitiesChunk);
};

export const useCreateCity = () => {
    return useMutation(postCity);
};

export const useUpdateCity = () => {
    return useMutation(putCity);
};

export const useDeleteCity = () => {
    return useMutation(deleteCity);
};
