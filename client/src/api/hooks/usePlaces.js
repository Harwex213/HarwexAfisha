import { useMutation, useQuery } from "react-query";
import { getPlacesChunk, postPlace, putPlace, deletePlace } from "../fetch/places";

export const usePlacesChunk = ({ cityId }) => {
    return useQuery(["places", { type: "chunk", cityId }], () => getPlacesChunk({ cityId }));
};

export const useCreatePlace = () => {
    return useMutation(postPlace);
};

export const useUpdatePlace = () => {
    return useMutation(putPlace);
};

export const useDeletePlace = () => {
    return useMutation(deletePlace);
};
