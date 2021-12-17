import { useMutation, useQuery } from "react-query";
import { getUserTickets, postTicket } from "../fetch/tickets";

export const useUserTickets = () => {
    return useQuery("tickets", getUserTickets);
};

export const useOrderTicketMutation = () => {
    return useMutation(postTicket);
};
