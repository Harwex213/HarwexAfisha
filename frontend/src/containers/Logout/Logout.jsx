import React from "react";
import { useLogoutMutation } from "../../store/api/user";
import { logout as logoutAction } from "../../store/slices/userSlice";
import { notification } from "antd";
import { useDispatch } from "react-redux";

const Logout = () => {
    const dispatch = useDispatch();
    const [logout] = useLogoutMutation();

    const handleLogoutClick = async (event) => {
        event.preventDefault();
        try {
            await logout().unwrap();
            dispatch(logoutAction());
            notification["success"]({
                message: "Success.",
                placement: "topLeft",
            });
        } catch (e) {
            notification["error"]({
                message: "Cannot logout.",
                description: e.data.message,
                placement: "topLeft",
            });
        }
    };

    return <a onClick={handleLogoutClick}>Выход</a>;
};

export default Logout;
