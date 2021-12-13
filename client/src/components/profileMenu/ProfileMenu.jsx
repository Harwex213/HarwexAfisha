import React from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { Menu, MenuItem } from "@mui/material";
import { userRoles } from "../../common/constants/users";
import { routePaths } from "../../common/constants/routePaths";

export const ProfileMenu = ({ anchorEl, isMenuOpen, handleMenuClose }) => {
    const { user } = useAuthContext();

    let menu;
    switch (user?.role) {
        case userRoles.guest:
            menu = <GuestProfileMenu handleMenuClose={handleMenuClose} />;
            break;
        case userRoles.user:
            menu = <UserProfileMenu handleMenuClose={handleMenuClose} />;
            break;
        case userRoles.manager:
            menu = <ManagerProfileMenu handleMenuClose={handleMenuClose} />;
            break;
        default:
            menu = null;
            break;
    }

    return (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "left",
            }}
            open={isMenuOpen && Boolean(menu)}
            onClose={handleMenuClose}
        >
            {menu}
        </Menu>
    );
};

const GuestProfileMenu = ({ handleMenuClose }) => {
    return (
        <>
            <MenuItem component={RouterLink} to={routePaths.login} onClick={handleMenuClose}>
                Login
            </MenuItem>
            <MenuItem component={RouterLink} to={routePaths.register} onClick={handleMenuClose}>
                Registration
            </MenuItem>
        </>
    );
};

const UserProfileMenu = ({ handleMenuClose }) => {
    // TODO: log out mutation

    return (
        <>
            <MenuItem component={RouterLink} to={routePaths.profile} onClick={handleMenuClose}>
                Profile
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>Log out</MenuItem>
        </>
    );
};

const ManagerProfileMenu = ({ handleMenuClose }) => {
    // TODO: log out mutation

    return (
        <>
            <MenuItem onClick={handleMenuClose}>Log out</MenuItem>
        </>
    );
};

ProfileMenu.propTypes = {
    anchorEl: PropTypes.object,
    isMenuOpen: PropTypes.bool,
    handleMenuClose: PropTypes.func,
};

GuestProfileMenu.propTypes = {
    handleMenuClose: PropTypes.func,
};

UserProfileMenu.propTypes = {
    handleMenuClose: PropTypes.func,
};

ManagerProfileMenu.propTypes = {
    handleMenuClose: PropTypes.func,
};
