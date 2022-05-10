import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./contents/Login/Login";
import Account from "./contents/Account/Account";
import RouteRole from "../containers/RouteRole/RouteRole";
import { userRoles } from "../constants/userRoles";
import { Layout } from "antd";
import Afisha from "./contents/Afisha/Afisha";
import Register from "./contents/Register/Register";
import UserHeader from "./containers/UserHeader/UserHeader";
import "./userScreen.css";

const UserScreen = () => {
    return (
        <Layout>
            <Layout.Header className="userHeader">
                <UserHeader />
            </Layout.Header>
            <Layout.Content className="userScreen__content">
                <Routes>
                    <Route path="/" element={<Afisha />} />
                    <Route
                        path="login"
                        element={
                            <RouteRole roles={[userRoles.GUEST]} to="/account">
                                <Login />
                            </RouteRole>
                        }
                    />
                    <Route
                        path="register"
                        element={
                            <RouteRole roles={[userRoles.GUEST]} to="/account">
                                <Register />
                            </RouteRole>
                        }
                    />
                    <Route
                        path="account"
                        element={
                            <RouteRole roles={[userRoles.USER]} to="/login">
                                <Account />
                            </RouteRole>
                        }
                    />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Layout.Content>
        </Layout>
    );
};

export default UserScreen;
