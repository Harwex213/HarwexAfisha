import React from "react";
import { useLogoutMutation } from "../../store/api/user";
import { setUser } from "../../store/slices/userSlice";
import { userRoles } from "../../constants/userRoles";
import { notification } from "antd";
import { useDispatch } from "react-redux";

const Logout = () => {
    const dispatch = useDispatch();
    const [logout] = useLogoutMutation();

    const handleLogoutClick = async (event) => {
        event.preventDefault();
        try {
            await logout().unwrap();
            dispatch(
                setUser({
                    id: -1,
                    username: "Guest",
                    role: userRoles.GUEST,
                })
            );
            notification["success"]({
                message: "Success.",
            });
        } catch (e) {
            notification["error"]({
                message: "Cannot logout.",
                description: e.data.message,
            });
        }
    };

    return <a onClick={handleLogoutClick}>Logout</a>;
};

export default Logout;
