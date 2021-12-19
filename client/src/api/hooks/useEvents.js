import { useMutation, useQuery } from "react-query";
import {
    getEvent,
    getEventsByCityDate,
    getEventsChunk,
    postEvent,
    putEvent,
    deleteEvent,
} from "../fetch/events";
import queryClient from "../../app/queryClient";

export const useEventsByCityDate = ({ cityId, date }) => {
    return useQuery(["events", { cityId, date }], () => getEventsByCityDate({ cityId, date }));
};

export const useEvent = ({ id }) => {
    return useQuery(["event", { id }], () => getEvent({ id }));
};

export const useEventsChunk = ({ onSuccess }) => {
    return useQuery(["events", { type: "chunk" }], getEventsChunk, {
        onSuccess: onSuccess,
    });
};

export const useCreateEvent = () => {
    return useMutation(postEvent, {
        onSuccess: () => queryClient.invalidateQueries(["events", { type: "chunk" }]),
    });
};

export const useUpdateEvent = () => {
    return useMutation(putEvent, {
        onSuccess: () => queryClient.invalidateQueries(["events", { type: "chunk" }]),
    });
};

export const useDeleteEvent = () => {
    return useMutation(deleteEvent, {
        onSuccess: () => queryClient.invalidateQueries(["events", { type: "chunk" }]),
    });
};
