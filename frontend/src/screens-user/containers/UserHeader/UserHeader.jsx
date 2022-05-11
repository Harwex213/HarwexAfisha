import React from "react";
import { Link, useSearchParams, createSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { HomeOutlined } from "@ant-design/icons";
import { selectUser } from "../../../store/slices/userSlice";
import { userRoles } from "../../../constants/userRoles";
import Logout from "../../../containers/Logout/Logout";
import AccountMenu from "../../../components/AccountMenu/AccountMenu";
import SelectCity from "../SelectCity/SelectCity";
import moment from "moment";
import { DatePicker } from "antd";
import { setDate } from "../../../store/slices/afishaSlice";
import "./userHeader.css";

const guestAccountMenuItems = [
    [<Link to="login">Вход</Link>, "login"],
    [<Link to="register">Регистрация</Link>, "register"],
];

const userAccountMenuItems = [
    [<Link to="account">Аккаунт</Link>, "account"],
    [<Logout />, "logout"],
];

const disabledDate = (current) => {
    return current && current < moment().endOf("day").add(-1, "day");
};

const Header = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const isGuest = user.role === userRoles.GUEST;
    const queryStringDate = searchParams.get("date");

    const accountMenuItems = isGuest ? guestAccountMenuItems : userAccountMenuItems;

    const onDateChange = (date) => {
        dispatch(setDate({ date: date.format("YYYY-MM-DD") }));
        setSearchParams(
            createSearchParams({
                date: date.format("YYYY-MM-DD"),
            })
        );
    };

    const onTitleClick = () => {
        navigate({
            pathname: "/movies",
            search: searchParams.toString(),
        });
    };

    return (
        <>
            <h1 className="userHeader__title" onClick={onTitleClick}>
                <h1>Harwex Tickets</h1>
            </h1>
            <div className="userHeader__content">
                <DatePicker
                    allowClear={false}
                    defaultValue={queryStringDate ? moment(queryStringDate) : moment()}
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
