import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import afishaSlice from "./slices/afishaSlice";
import api from "./api";

export const store = configureStore({
    reducer: {
        user: userSlice,
        afisha: afishaSlice,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});
