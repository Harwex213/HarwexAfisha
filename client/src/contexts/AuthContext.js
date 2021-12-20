import React from "react";
import { createContext, useContext } from "react";
import PropTypes from "prop-types";
import { userRoles } from "../common/constants/users";
import { useGetMe } from "../api/hooks/useAuth";
import { CircularProgress, Stack } from "@mui/material";

const defaultValue = {
    user: {
        id: null,
        username: null,
        role: userRoles.guest,
    },
};

export const AuthContext = createContext(defaultValue);

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const { isLoading, isSuccess, data } = useGetMe();

    const value = isSuccess
        ? {
              user: {
                  ...data,
                  role: data.role.toUpperCase(),
              },
          }
        : defaultValue;
    return isLoading ? (
        <Stack sx={{ height: "100vh", alignItems: "center", justifyContent: "center" }}>
            <CircularProgress />
        </Stack>
    ) : (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.element,
};
