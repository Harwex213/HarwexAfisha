import { useMutation, useQuery } from "react-query";
import { getEventPlacesChunk, postEventPlace, deleteEventPlace } from "../fetch/eventPlaces";

export const useEventPlacesChunk = ({ placeId }) => {
    return useQuery(["eventPlaces", { type: "chunk", placeId }], () => getEventPlacesChunk({ placeId }), {
        enabled: Boolean(placeId),
    });
};

export const useCreateEventPlace = () => {
    return useMutation(postEventPlace);
};

export const useDeleteEventPlace = () => {
    return useMutation(deleteEventPlace);
};
