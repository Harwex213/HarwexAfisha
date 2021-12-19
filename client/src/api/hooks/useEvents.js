import { useMutation, useQuery } from "react-query";
import {
    getEvent,
    getEventsByCityDate,
    getEventsChunk,
    postEvent,
    putEvent,
    deleteEvent,
} from "../fetch/events";

export const useEventsByCityDate = ({ cityId, date }) => {
    return useQuery(["events", { cityId, date }], () => getEventsByCityDate({ cityId, date }));
};

export const useEvent = ({ id }) => {
    return useQuery(["event", { id }], () => getEvent({ id }));
};

export const useEventsChunk = () => {
    return useQuery(["events", { type: "chunk" }], getEventsChunk);
};

export const useCreateEvent = () => {
    return useMutation(postEvent);
};

export const useUpdateEvent = () => {
    return useMutation(putEvent);
};

export const useDeleteEvent = () => {
    return useMutation(deleteEvent);
};
