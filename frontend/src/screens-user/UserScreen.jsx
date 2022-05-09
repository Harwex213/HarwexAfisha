import React from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Login from "./contents/Login/Login";
import Account from "./contents/Account/Account";
import RouteRole from "../containers/RouteRole/RouteRole";
import { userRoles } from "../constants/userRoles";
import { Layout } from "antd";
import Afisha from "./contents/Afisha/Afisha";
import AccountMenu from "../components/AccountMenu/AccountMenu";
import "./userScreen.css";
import { useSelector } from "react-redux";
import { selectUser } from "../store/slices/userSlice";
import Logout from "../containers/Logout/Logout";
import Register from "./contents/Register/Register";

const UserScreen = () => {
    const user = useSelector(selectUser);

    const accountMenuItems =
        user.role === userRoles.GUEST
            ? [
                  [<Link to="login">Login</Link>, "login"],
                  [<Link to="register">Register</Link>, "register"],
              ]
            : [
                  [<Link to="account">Account</Link>, "account"],
                  [<Logout />, "logout"],
              ];

    return (
        <Layout className="userScreen">
            <Layout.Header className="userHeader">
                <Link to="/">
                    <h1 className="userHeader__title">Harwex Tickets</h1>
                </Link>
                <div className="userHeader__accountAvatar">
                    <AccountMenu
                        menuClassName="userHeader__accountMenu"
                        menuItems={accountMenuItems}
                        dropdownPlacement="bottomRight"
                    />
                </div>
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
