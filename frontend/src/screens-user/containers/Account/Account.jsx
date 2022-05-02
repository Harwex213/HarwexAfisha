import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/slices/userSlice";

const Account = () => {
    const user = useSelector(selectUser);

    return <>{user.id}</>;
};

export default Account;
