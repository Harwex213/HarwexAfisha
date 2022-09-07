import api from "../api";

const fileApi = api.injectEndpoints({
    endpoints: (builder) => ({
        upload: builder.mutation({
            query: (formData) => ({
                url: "file/upload",
                method: "POST",
                body: formData,
            }),
        }),
    }),
});

export const { useUploadMutation } = fileApi;
