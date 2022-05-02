import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import api from "./api";

export const store = configureStore({
    reducer: {
        user: userSlice,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});
