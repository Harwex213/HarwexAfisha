import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./containers/Login/Login";
import Account from "./containers/Account/Account";
import RouteRole from "../containers/RouteRole/RouteRole";
import { userRoles } from "../constants/userRoles";
import { Avatar, Layout } from "antd";
import { UserOutlined } from "@ant-design/icons";

const UserScreen = () => {
    return (
        <Layout>
            <Layout.Header className="header">
                <Link to="/">
                    <h1 className="header__title">Harwex Tickets</h1>
                </Link>
                <Link className="header__avatar" to="/account">
                    <Avatar size="large" icon={<UserOutlined />} />
                </Link>
            </Layout.Header>
            <Layout.Content className="screen">
                <Routes>
                    <Route path="/" element={<div>this is user screen sukya</div>} />
                    <Route
                        path="login"
                        element={
                            <RouteRole roles={[userRoles.GUEST]} to="/account">
                                <Login />
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
                </Routes>
            </Layout.Content>
        </Layout>
    );
};

export default UserScreen;
