import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminScreen from "../screens-admin/AdminScreen";
import UserScreen from "../screens-user/UserScreen";
import RouteRole from "../containers/RouteRole/RouteRole";
import { userRoles } from "../constants/userRoles";
import { useCheckQuery } from "../store/api/user";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser, setUser } from "../store/slices/userSlice";
import { Spin } from "antd";
import "./app.css";

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

    if (Object.keys(user).length === 0) {
        return (
            <div className="spin">
                <Spin size="large" />
            </div>
        );
    }

    return (
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
    );
};

export default PreAuth;
