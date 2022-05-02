import React from "react";
import { Layout, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import AdminLeftMenu from "./containers/Menu/AdminLeftMenu";
import "./adminScreen.css";

const AdminScreen = () => {
    return (
        <Layout>
            <Layout.Header className="header">
                <h1 className="header__title">Harwex Tickets | Dashboard</h1>
                <Avatar className="header__avatar" size="large" icon={<UserOutlined />} />
            </Layout.Header>
            <Layout className="screen">
                <Layout.Sider>
                    <AdminLeftMenu />
                </Layout.Sider>
                <Layout.Content>
                    <div>this is admin screen sukya</div>
                </Layout.Content>
            </Layout>
        </Layout>
    );
};

export default AdminScreen;
