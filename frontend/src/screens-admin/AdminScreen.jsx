import React from "react";
import { Layout } from "antd";
import { Routes, useNavigate, Route, Navigate } from "react-router-dom";
import AdminLeftMenu from "./containers/Menu/AdminLeftMenu";
import Movies from "./Contents/Movies/Movies";
import Cities from "./Contents/Cities/Cities";
import "./adminScreen.css";
import AccountMenu from "../components/AccountMenu/AccountMenu";
import Logout from "../containers/Logout/Logout";

const defaultContent = "movies";

const AdminScreen = () => {
    const navigate = useNavigate();

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
                        menuItems={[[<Logout />, "logout"]]}
                        dropdownPlacement="bottomRight"
                    />
                </div>
            </Layout.Header>
            <Layout className="adminScreen">
                <Layout.Sider>
                    <AdminLeftMenu onSelect={onMenuSelect} defaultSelectedKeys={[defaultContent]} />
                </Layout.Sider>
                <Layout.Content>
                    <Routes>
                        <Route path="cities" element={<Cities />} />
                        <Route path="movies" element={<Movies />} />
                        <Route
                            path="*"
                            element={<Navigate to={defaultContent} state={{ from: "/" }} replace />}
                        />
                    </Routes>
                </Layout.Content>
            </Layout>
        </Layout>
    );
};

export default AdminScreen;
