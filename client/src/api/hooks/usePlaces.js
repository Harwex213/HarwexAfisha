import { useMutation, useQuery } from "react-query";
import { getPlacesChunk, postPlace, putPlace, deletePlace } from "../fetch/places";
import queryClient from "../../app/queryClient";

export const usePlacesChunk = ({ cityId }, onSuccess = (data) => data) => {
    return useQuery(["places", { type: "chunk", cityId }], () => getPlacesChunk({ cityId }), {
        enabled: Boolean(cityId),
        onSuccess: onSuccess,
    });
};

export const useCreatePlace = () => {
    return useMutation(postPlace, {
        onSuccess: () => queryClient.invalidateQueries(["places", { type: "chunk" }]),
    });
};

export const useUpdatePlace = () => {
    return useMutation(putPlace, {
        onSuccess: () => queryClient.invalidateQueries(["places", { type: "chunk" }]),
    });
};

export const useDeletePlace = () => {
    return useMutation(deletePlace, {
        onSuccess: () => queryClient.invalidateQueries(["places", { type: "chunk" }]),
    });
};
