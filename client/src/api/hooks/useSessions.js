import { useQuery } from "react-query";
import { getSessionsByEventCityDate } from "../fetch/sessions";

export const useSessionsByDateEventCity = ({ date, cityId, eventId }) => {
    return useQuery(["sessions", { cityId, date, eventId }], () =>
        getSessionsByEventCityDate({ cityId, date, eventId })
    );
};
