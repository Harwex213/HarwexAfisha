import api from "../api";

const ticketApi = api.injectEndpoints({
    endpoints: (builder) => ({
        orderTicket: builder.mutation({
            query: ({ sessionId, userId, row, position }) => ({
                url: "ticket/order",
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: {
                    sessionId,
                    userId,
                    row,
                    position,
                },
            }),
            invalidatesTags: "ticket",
        }),
    }),
});

export const { useOrderTicketMutation } = ticketApi;
