import { authApi, privateApi } from "./api";

export const login = ({ username, password }) =>
    authApi
        .post("auth/login", {
            json: { username, password },
        })
        .json();

export const register = ({ username, password, repeatPassword, firstName, lastName, patronymic }) =>
    authApi
        .post("auth/register", {
            json: { username, password, repeatPassword, firstName, lastName, patronymic },
        })
        .json();

export const getMe = () => privateApi.get("auth").json();
