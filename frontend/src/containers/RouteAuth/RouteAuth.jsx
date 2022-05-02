import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/userSlice";
import { userRoles } from "../../constants/userRoles";

const RouteAuth = ({ children, to }) => {
    const user = useSelector(selectUser);
    const location = useLocation();

    if (user.role === userRoles.GUEST) {
        return <Navigate to={to} state={{ from: location }} replace />;
    }

    return children;
};

export default RouteAuth;
