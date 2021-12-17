import { useQuery } from "react-query";
import { getEvent, getEventsByCityDate } from "../fetch/events";

export const useEventsByCityDate = ({ cityId, date }) => {
    return useQuery(["events", { cityId, date }], () => getEventsByCityDate({ cityId, date }));
};

export const useEvent = ({ id }) => {
    return useQuery(["event", { id }], () => getEvent({ id }));
};
