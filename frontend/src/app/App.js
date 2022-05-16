import React, { lazy, Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import RouteRole from "../containers/RouteRole/RouteRole";
import { userRoles } from "../constants/userRoles";
import { useCheckQuery } from "../store/api/user";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser, setUser } from "../store/slices/userSlice";
import { Spin } from "antd";
import "./app.css";

const AdminScreen = lazy(() => import("../screens-admin/AdminScreen"));
const UserScreen = lazy(() => import("../screens-user/UserScreen"));

const PreAuth = () => {
    const dispatch = useDispatch();
    const { data: fetchedUser, isSuccess, isError } = useCheckQuery();

    useEffect(() => {
        if (isSuccess) {
            dispatch(setUser(fetchedUser));
        }
        if (isError) {
            dispatch(logout());
        }
    });

    return <App />;
};

const App = () => {
    const user = useSelector(selectUser);

    const fallback = (
        <div className="spin">
            <Spin size="large" />
        </div>
    );

    if (Object.keys(user).length === 0) {
        return fallback;
    }

    return (
        <Suspense fallback={fallback}>
            <Routes>
                <Route
                    path="/*"
                    element={
                        <RouteRole roles={[userRoles.GUEST, userRoles.USER]} to="/admin">
                            <UserScreen />
                        </RouteRole>
                    }
                />
                <Route
                    path="/admin/*"
                    element={
                        <RouteRole roles={[userRoles.ADMIN]} to="/">
                            <AdminScreen />
                        </RouteRole>
                    }
                />
            </Routes>
        </Suspense>
    );
};

export default PreAuth;
