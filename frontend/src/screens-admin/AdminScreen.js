import React from "react";
import { Layout, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Routes, useNavigate, Route, Navigate } from "react-router-dom";
import AdminLeftMenu from "./containers/Menu/AdminLeftMenu";
import Movies from "./containers/Movies/Movies";
import Cities from "./containers/Cities/Cities";
import "./adminScreen.css";

const defaultContent = "movies";

const AdminScreen = () => {
    const navigate = useNavigate();

    const onMenuSelect = ({ key }) => {
        navigate(key);
    };

    return (
        <Layout>
            <Layout.Header className="header">
                <h1 className="header__title">Harwex Tickets | Dashboard</h1>
                <Avatar className="header__avatar" size="large" icon={<UserOutlined />} />
            </Layout.Header>
            <Layout className="screen">
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
