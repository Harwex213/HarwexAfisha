import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminScreen from "../screens-admin/AdminScreen";
import UserScreen from "../screens-user/UserScreen";
import RouteRole from "../containers/RouteRole/RouteRole";
import { userRoles } from "../constants/userRoles";
import { useCheckQuery } from "../store/api/user";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/userSlice";
import { Spin } from "antd";
import "./app.css";

const App = () => {
    const dispatch = useDispatch();
    const { data: user, error, isLoading } = useCheckQuery();

    useEffect(() => {
        if (!isLoading && !error) {
            dispatch(setUser(user));
        }
    });

    if (isLoading) {
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
                path="/admin"
                element={
                    <RouteRole roles={[userRoles.ADMIN]} to="/">
                        <AdminScreen />
                    </RouteRole>
                }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default App;
