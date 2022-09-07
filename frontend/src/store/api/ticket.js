import api from "../api";

const ticketApi = api.injectEndpoints({
    endpoints: (builder) => ({
        orderTicket: builder.mutation({
            query: ({ ticket, emailInfo }) => ({
                url: "ticket/order",
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: { ticket, emailInfo },
            }),
            invalidatesTags: ["ticket", "session"],
        }),
        returnBack: builder.mutation({
            query: ({ id }) => ({
                url: "ticket/returnBack",
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: {
                    id: Number(id),
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

export const { useOrderTicketMutation, useGetUserTicketsQuery, useReturnBackMutation } = ticketApi;
