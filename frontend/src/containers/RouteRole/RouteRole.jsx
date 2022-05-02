import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/userSlice";

const RouteRole = ({ children, roles, to }) => {
    const user = useSelector(selectUser);
    const location = useLocation();

    if (roles.includes(user.role) === false) {
        return <Navigate to={to} state={{ from: location }} replace />;
    }

    return children;
};

export default RouteRole;
