import React from "react";
import { createContext, useContext } from "react";
import PropTypes from "prop-types";
import { userRoles } from "../common/constants/users";

const defaultValue = {
    user: {
        id: null,
        username: null,
        firstName: null,
        lastName: null,
        patronymic: null,
        role: userRoles.user,
    },
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
