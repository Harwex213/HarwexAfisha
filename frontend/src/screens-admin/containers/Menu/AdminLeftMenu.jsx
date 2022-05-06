import React from "react";
import { Menu } from "antd";
import { MailOutlined } from "@ant-design/icons";

const getItem = (label, key, icon, children, type) => {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
};

const items = [
    getItem("Cities", "cities", <MailOutlined />),
    getItem("Movies", "movies", <MailOutlined />),
    getItem("Cinemas", "cinemas-option", <MailOutlined />, [
        getItem("Cinemas", "cinemas"),
        getItem(
            "Concrete",
            "cinemas-concrete",
            null,
            [
                getItem("Movies", "cinema-movies"),
                getItem("Halls", "cinema-halls"),
                getItem("Sessions", "cinema-sessions"),
                getItem("Tickets", "cinema-tickets"),
            ],
            "group"
        ),
    ]),
];

const AdminLeftMenu = ({ onSelect, defaultSelectedKeys }) => {
    return (
        <Menu
            mode="inline"
            theme="light"
            defaultSelectedKeys={defaultSelectedKeys}
            defaultOpenKeys={["cinemas-option"]}
            style={{
                height: "100%",
                overflowY: "auto",
                overflowX: "clip",
            }}
            items={items}
            onSelect={onSelect}
        />
    );
};

export default AdminLeftMenu;
