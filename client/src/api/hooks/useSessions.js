import { useMutation, useQuery } from "react-query";
import {
    getSessionsByEventCityDate,
    getSessionsChunk,
    postSession,
    putSession,
    deleteSession,
} from "../fetch/sessions";

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
    return useMutation(postSession);
};

export const useUpdateSession = () => {
    return useMutation(putSession);
};

export const useDeleteSession = () => {
    return useMutation(deleteSession);
};
