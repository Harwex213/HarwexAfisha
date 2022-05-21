import React from "react";
import { Layout } from "antd";
import { Routes, useNavigate, Route, useLocation, Navigate } from "react-router-dom";
import AdminLeftMenu from "./containers/Menu/AdminLeftMenu";
import Movies from "./Contents/Movies/Movies";
import Cities from "./Contents/Cities/Cities";
import Cinemas from "./Contents/Cinemas/Cinemas";
import AccountMenu from "../components/AccountMenu/AccountMenu";
import Logout from "../containers/Logout/Logout";
import "./adminScreen.css";

const AdminScreen = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const onMenuSelect = ({ key }) => {
        navigate(key);
    };

    return (
        <Layout>
            <Layout.Header className="adminHeader">
                <h1 className="adminHeader__title">Harwex Tickets | Dashboard</h1>
                <div className="adminHeader__avatar">
                    <AccountMenu
                        menuClassName="adminHeader__accountMenu"
                        iconClassName="adminHeader__accountIcon"
                        menuItems={[[<Logout />, "logout"]]}
                        dropdownPlacement="bottomRight"
                    />
                </div>
            </Layout.Header>
            <Layout className="adminScreen">
                <Layout.Sider>
                    <AdminLeftMenu onSelect={onMenuSelect} />
                </Layout.Sider>
                <Layout.Content className="adminScreen__content">
                    <Routes>
                        <Route path="cities" element={<Cities />} />
                        <Route path="movies" element={<Movies />} />
                        <Route path="cinemas/*" element={<Cinemas />} />
                        <Route
                            path="*"
                            element={<Navigate to="cities" state={{ from: location }} replace />}
                        />
                    </Routes>
                </Layout.Content>
            </Layout>
        </Layout>
    );
};

export default AdminScreen;
