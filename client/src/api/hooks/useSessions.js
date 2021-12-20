import { useMutation, useQuery } from "react-query";
import {
    getSessionsByEventCityDate,
    getSessionsChunk,
    postSession,
    putSession,
    deleteSession,
} from "../fetch/sessions";
import queryClient from "../../app/queryClient";

export const useSessionsByDateEventCity = ({ date, cityId, eventId }) => {
    return useQuery(["sessions", { cityId, date, eventId }], () =>
        getSessionsByEventCityDate({ cityId, date, eventId })
    );
};

export const useSessionsChunk = ({ eventPlaceId }) => {
    return useQuery(
        [
            "sessions",
            {
                type: "chunk",
                eventPlaceId,
            },
        ],
        () => getSessionsChunk({ eventPlaceId })
    );
};

export const useCreateSession = () => {
    return useMutation(postSession, {
        onSuccess: () => queryClient.invalidateQueries(["sessions", { type: "chunk" }]),
    });
};

export const useUpdateSession = () => {
    return useMutation(putSession, {
        onSuccess: () => queryClient.invalidateQueries(["sessions", { type: "chunk" }]),
    });
};

export const useDeleteSession = () => {
    return useMutation(deleteSession, {
        onSuccess: () => queryClient.invalidateQueries(["sessions", { type: "chunk" }]),
    });
};
