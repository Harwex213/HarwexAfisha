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
                    sessionId: Number(sessionId),
                    userId,
                    row,
                    position,
                },
            }),
            invalidatesTags: ["ticket", "session"],
        }),
        getUserTickets: builder.query({
            query: ({ userId, thresholdDate, offset, isBefore = false }) => ({
                url: "ticket/getUserTickets",
                method: "POST",
                body: { userId: Number(userId), offset, thresholdDate, isBefore },
            }),
            transformResponse: (response) => {
                const rows = response.rows;
                for (const row of rows) {
                    row.id = Number(row.id);
                    row.movieId = Number(row.movieId);
                    row.hallId = Number(row.hallId);
                }

                return {
                    count: response.count,
                    rows,
                };
            },
            providesTags: ["ticket"],
        }),
    }),
});

export const { useOrderTicketMutation, useGetUserTicketsQuery } = ticketApi;
