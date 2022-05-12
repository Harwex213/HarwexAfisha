import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { HomeOutlined } from "@ant-design/icons";
import { selectUser } from "../../../store/slices/userSlice";
import { userRoles } from "../../../constants/userRoles";
import Logout from "../../../containers/Logout/Logout";
import AccountMenu from "../../../components/AccountMenu/AccountMenu";
import SelectCity from "../SelectCity/SelectCity";
import moment from "moment";
import { DatePicker } from "antd";
import { setDate as setDateAction } from "../../../store/slices/afishaSlice";
import "./userHeader.css";
import useLocalStorageState from "../../../hooks/useLocalStorageState";

const guestAccountMenuItems = [
    [<Link to="login">Вход</Link>, "login"],
    [<Link to="register">Регистрация</Link>, "register"],
];

const userAccountMenuItems = [
    [<Link to="account">Аккаунт</Link>, "account"],
    [<Link to="tickets">Билеты</Link>, "tickets"],
    [<Logout />, "logout"],
];

const disabledDate = (current) => {
    return current && current < moment().endOf("day").add(-1, "day");
};

const Header = () => {
    const [date, setDate] = useLocalStorageState("afisha/date", moment().format("YYYY-MM-DD"));
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const isGuest = user.role === userRoles.GUEST;

    const accountMenuItems = isGuest ? guestAccountMenuItems : userAccountMenuItems;

    const onDateChange = (date) => {
        dispatch(setDateAction({ date: date.format("YYYY-MM-DD") }));
        setDate(date.format("YYYY-MM-DD"));
    };

    return (
        <>
            <Link className="userHeader__title" to="movies">
                <h1>Harwex Tickets</h1>
            </Link>
            <div className="userHeader__content">
                <DatePicker
                    allowClear={false}
                    defaultValue={moment(date)}
                    onChange={onDateChange}
                    disabledDate={disabledDate}
                />
                <SelectCity className="userHeader__selectCity" placeholder={<HomeOutlined />} size="large" />
            </div>
            <div className="userHeader__accountAvatar">
                {isGuest ? <></> : <h3 className="userHeader__userGreetings">Привет, {user.firstName}</h3>}
                <AccountMenu
                    menuClassName="userHeader__accountMenu"
                    iconClassName="userHeader__accountIcon"
                    menuItems={accountMenuItems}
                    dropdownPlacement="bottomRight"
                />
            </div>
        </>
    );
};

export default Header;
