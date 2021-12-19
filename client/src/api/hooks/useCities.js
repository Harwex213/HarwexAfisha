import { useMutation, useQuery } from "react-query";
import { getPopularCities, getCitiesChunk, postCity, putCity, deleteCity } from "../fetch/cities";
import queryClient from "../../app/queryClient";

export const usePopularCities = ({ onSuccess }) => {
    return useQuery(["cities", { type: "popular" }], getPopularCities, {
        onSuccess: onSuccess ?? ((data) => data),
    });
};

export const useCitiesChunk = () => {
    return useQuery(["cities", { type: "chunk" }], getCitiesChunk);
};

export const useCreateCity = () => {
    return useMutation(postCity, {
        onSuccess: () => queryClient.invalidateQueries(["cities", { type: "chunk" }]),
    });
};

export const useUpdateCity = () => {
    return useMutation(putCity, {
        onSuccess: () => queryClient.invalidateQueries(["cities", { type: "chunk" }]),
    });
};

export const useDeleteCity = () => {
    return useMutation(deleteCity, {
        onSuccess: () => queryClient.invalidateQueries(["cities", { type: "chunk" }]),
    });
};
