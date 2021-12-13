import React from "react";
import { createContext, useContext } from "react";
import PropTypes from "prop-types";

const defaultValue = {
    isAuth: false,
    user: null,
};

export const AuthContext = createContext(defaultValue);

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    // TODO: get user via access token

    return <AuthContext.Provider value={defaultValue}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
    children: PropTypes.element,
};
