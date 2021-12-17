import React from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { Menu, MenuItem } from "@mui/material";
import { userRoles } from "../../common/constants/users";
import { routePaths } from "../../common/constants/routePaths";
import { useLogout } from "../../api/hooks/useAuth";

export const ProfileMenu = ({ anchorEl, isMenuOpen, handleMenuClose }) => {
    const { user } = useAuthContext();
    const logoutMutation = useLogout();

    let menu;
    switch (user?.role) {
        case userRoles.guest:
            menu = <GuestProfileMenu handleMenuClose={handleMenuClose} />;
            break;
        case userRoles.user:
            menu = <UserProfileMenu handleMenuClose={handleMenuClose} handleLogoutClick={logoutMutation} />;
            break;
        case userRoles.manager:
            menu = (
                <ManagerProfileMenu handleMenuClose={handleMenuClose} handleLogoutClick={logoutMutation} />
            );
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

const UserProfileMenu = ({ handleMenuClose, handleLogoutClick }) => {
    return (
        <>
            <MenuItem component={RouterLink} to={routePaths.profile} onClick={handleMenuClose}>
                Profile
            </MenuItem>
            <MenuItem
                onClick={() => {
                    handleMenuClose();
                    handleLogoutClick();
                }}
            >
                Log out
            </MenuItem>
        </>
    );
};

const ManagerProfileMenu = ({ handleMenuClose, handleLogoutClick }) => {
    return (
        <>
            <MenuItem
                onClick={() => {
                    handleMenuClose();
                    handleLogoutClick();
                }}
            >
                Log out
            </MenuItem>
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
    handleLogoutClick: PropTypes.func,
};

ManagerProfileMenu.propTypes = {
    handleMenuClose: PropTypes.func,
    handleLogoutClick: PropTypes.func,
};
