import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { userRoles } from "../../common/constants/users";
import { routePaths } from "../../common/constants/routePaths";

const Main = () => {
    const { user } = useAuthContext();
    const isManager = user.role.toUpperCase() === userRoles.manager;

    return isManager ? (
        <Navigate to={routePaths.dashboard} replace />
    ) : (
        <Navigate to={routePaths.posters} replace />
    );
};

export default Main;
