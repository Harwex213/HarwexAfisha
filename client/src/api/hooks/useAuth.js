import { useMutation, useQuery, useQueryClient } from "react-query";
import { login, register, getMe } from "../fetch/auth";
import { killToken } from "../../common/jwt";

export const useLogin = () => {
    return useMutation(login);
};

export const useRegister = () => {
    return useMutation(register);
};

export const useLogout = () => {
    const queryClient = useQueryClient();

    return () => {
        killToken();
        queryClient.invalidateQueries("user");
    };
};

export const useGetMe = () => {
    return useQuery("user", getMe, {
        retry: 0,
    });
};
