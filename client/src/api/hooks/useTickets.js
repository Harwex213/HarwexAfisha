import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteTicket, getUserTickets, postTicket } from "../fetch/tickets";

export const useUserTickets = () => {
    return useQuery("tickets", getUserTickets);
};

export const useOrderTicketMutation = () => {
    return useMutation(postTicket);
};

export const useReturnTicketMutation = () => {
    const queryClient = useQueryClient();
    return useMutation(deleteTicket, {
        onSuccess: () => queryClient.invalidateQueries("tickets"),
    });
};
