import React, { useState } from "react";
import { Menu } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";

const keys = ["cities", "movies", "cinemas", "cinemas/movies", "cinemas/halls", "cinemas/sessions"];

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
                getItem("Movies", "cinemas/movies"),
                getItem("Halls", "cinemas/halls"),
                getItem("Sessions", "cinemas/sessions"),
            ],
            "group"
        ),
    ]),
];

const getValueFromPathName = (pathname) => {
    const split = pathname.split("/");
    if (split.length >= 3 && keys.includes(split.slice(2).join("/"))) {
        return split.slice(2).join("/");
    }

    return "cities";
};

const AdminLeftMenu = ({ onSelect }) => {
    const location = useLocation();
    const [value, setValue] = useState(getValueFromPathName(location.pathname));

    return (
        <Menu
            mode="inline"
            theme="light"
            selectedKeys={[value]}
            defaultOpenKeys={["cinemas-option"]}
            style={{
                height: "100%",
                overflowY: "auto",
                overflowX: "clip",
            }}
            items={items}
            onSelect={(select) => {
                setValue(select.key);
                onSelect(select);
            }}
        />
    );
};

export default AdminLeftMenu;
