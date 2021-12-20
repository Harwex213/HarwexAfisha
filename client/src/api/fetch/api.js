import ky from "ky";
import queryClient from "../../app/queryClient";
import { getToken, killToken, persistToken } from "../../common/jwt";

export const publicApi = ky.create({
    prefixUrl: "http://localhost:5000/api",
});

export const privateApi = publicApi.extend({
    hooks: {
        beforeRequest: [
            (request) => {
                const accessToken = getToken();

                if (accessToken) {
                    request.headers.set("Authorization", `Bearer ${accessToken}`);
                }
            },
        ],
        afterResponse: [
            (request, options, response) => {
                if (response.status === 401 || response.status === 403) {
                    queryClient.invalidateQueries("user");
                    killToken();
                }
            },
        ],
    },
});

export const authApi = publicApi.extend({
    hooks: {
        afterResponse: [
            async (request, options, response) => {
                if (response.ok) {
                    const result = await response.json();

                    queryClient.setQueryData("user", result);
                    persistToken(result.accessToken);
                }
            },
        ],
    },
});
