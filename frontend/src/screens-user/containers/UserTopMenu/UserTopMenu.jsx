import React from "react";
import { Menu } from "antd";
import { useSelector } from "react-redux";
import { selectCurrentRoute } from "../../../store/slices/afishaSlice";
import { userScreenRoutes } from "../../../constants/userScreenRoutes";
import { useNavigate } from "react-router-dom";

const items = [
    {
        label: "Playbill",
        key: userScreenRoutes.AFISHA,
    },
];

const UserTopMenu = ({ ...rest }) => {
    const navigate = useNavigate();
    const currentRoute = useSelector(selectCurrentRoute);

    return (
        <Menu
            items={items}
            selectedKeys={[currentRoute]}
            onSelect={({ key }) => navigate(key)}
            mode="horizontal"
            {...rest}
        />
    );
};

export default UserTopMenu;
