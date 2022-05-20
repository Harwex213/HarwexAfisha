import api from "../api";
import apiConfig from "../../constants/apiConfig";

const sessionApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getSessionsByHallAndDate: builder.query({
            query: ({ hallId, date, includeMovie = false }) => ({
                url: "session/getSessionsByHallAndDate",
                method: "POST",
                body: { date, hallId, includeMovie },
            }),
            transformResponse: (response) => {
                const rows = response;
                for (const row of rows) {
                    row.id = Number(row.id);
                    row.cinemaMovieId = Number(row.cinemaMovieId);
                    row.hallId = Number(row.hallId);
                    row.movieId = Number(row.movieId);
                }

                return {
                    ...response,
                    rows,
                };
            },
            providesTags: ["session"],
        }),
        getSessionsByCinemaDateMovie: builder.query({
            query: ({ cinemaId, movieId, date }) => ({
                url: "session/getSessionsByCinemaDateMovie",
                method: "POST",
                body: { cinemaId: Number(cinemaId), movieId: Number(movieId), date },
            }),
            transformResponse: (response) => {
                const rows = response;
                for (const row of rows) {
                    row.id = Number(row.id);
                    row.cinemaMovieId = Number(row.cinemaMovieId);
                    row.hallId = Number(row.hallId);
                }

                return rows;
            },
            providesTags: ["session"],
        }),
        getSessionOrderedSeats: builder.query({
            query: ({ sessionId }) => ({
                url: "session/getSessionOrderedSeats",
                method: "POST",
                body: { sessionId: Number(sessionId) },
            }),
            providesTags: ["session"],
            async onCacheEntryAdded({ sessionId }, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
                const ws = new WebSocket(`${apiConfig.baseWsUrl}tickets?sessionId=${sessionId}`);
                // console.log(arg);

                try {
                    await cacheDataLoaded;

                    const listener = (event) => {
                        const data = JSON.parse(event.data);

                        if (data.type === "ordered") {
                            updateCachedData((draft) => {
                                draft.push(data.seat);
                            });
                        } else {
                            updateCachedData((draft) => {
                                const index = draft.findIndex(
                                    (seat) => seat[0] === data.seat[0] && seat[1] === data.seat[1]
                                );
                                if (index !== -1) {
                                    draft.splice(index, 1);
                                }
                            });
                        }
                    };
                    ws.addEventListener("message", listener);
                } catch {
                    // ignored
                }

                await cacheEntryRemoved;
                ws.close();
            },
        }),
    }),
});

export const {
    useGetSessionsByHallAndDateQuery,
    useGetSessionsByCinemaDateMovieQuery,
    useGetSessionOrderedSeatsQuery,
} = sessionApi;
