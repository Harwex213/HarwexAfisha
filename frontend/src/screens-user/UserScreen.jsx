import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./contents/Login/Login";
import Account from "./contents/Account/Account";
import RouteRole from "../containers/RouteRole/RouteRole";
import { userRoles } from "../constants/userRoles";
import { Divider, Layout } from "antd";
import Afisha from "./contents/Afisha/Afisha";
import Register from "./contents/Register/Register";
import UserHeader from "./containers/UserHeader/UserHeader";
import Tickets from "./contents/Tickets/Tickets";
import "./userScreen.css";

const UserScreen = () => {
    return (
        <div className="userScreen">
            <Layout className="userScreen__container">
                <Layout.Header className="userHeader">
                    <UserHeader />
                </Layout.Header>
                <Layout.Content className="userScreen__content">
                    <Divider />
                    <Routes>
                        <Route path="movies/*" element={<Afisha />} />
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
                        <Route
                            path="tickets"
                            element={
                                <RouteRole roles={[userRoles.USER]} to="/login">
                                    <Tickets />
                                </RouteRole>
                            }
                        />
                        <Route path="*" element={<Navigate to="movies" replace />} />
                    </Routes>
                </Layout.Content>
                <Layout.Footer className="userScreen__footer">
                    <Divider />
                    <p className="userScreen__footerText">(c) Harwex. 2022</p>
                </Layout.Footer>
            </Layout>
        </div>
    );
};

export default UserScreen;
