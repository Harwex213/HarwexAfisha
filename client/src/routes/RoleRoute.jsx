import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuthContext } from "../contexts/AuthContext";
import { routePaths } from "../common/constants/routePaths";

const RoleRoute = ({ children, roles, navigateTo }) => {
    const { user } = useAuthContext();
    const isAllowed = roles.includes(user.role);

    return isAllowed ? children : <Navigate to={navigateTo ? navigateTo : routePaths.notFound} replace />;
};

RoleRoute.propTypes = {
    children: PropTypes.element,
    roles: PropTypes.array,
    navigateTo: PropTypes.string,
};

export default RoleRoute;
