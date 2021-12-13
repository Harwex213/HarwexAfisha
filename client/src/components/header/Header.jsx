import React, { useState } from "react";
import { useLocalStorage } from "../../common/hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { AppBar, Box, FormControl, IconButton, MenuItem, Select, Toolbar, Typography } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { ProfileMenu } from "../profileMenu/ProfileMenu";
import { defaultCity } from "../../common/constants/common";
import { routePaths } from "../../common/constants/routePaths";
import { userRoles } from "../../common/constants/users";
import { underlinedHover, whiteSelect } from "../../common/styles/material";

const Header = () => {
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const [menuAnchor, setMenuAnchor] = useState(null);
    const [city, setCity] = useLocalStorage("city", defaultCity);

    const isMenuOpen = Boolean(menuAnchor);
    const isShowSelectCity = [userRoles.user, userRoles.guest].includes(user.role.toUpperCase());

    const handleLogoClick = () => {
        navigate(routePaths.main, { replace: true });
    };

    const handleProfileMenuOpen = (event) => {
        setMenuAnchor(event.currentTarget);
    };

    const handleMenuClose = () => {
        setMenuAnchor(null);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography
                        sx={{
                            cursor: "pointer",
                            ...underlinedHover,
                        }}
                        variant="h5"
                        noWrap
                        component="div"
                        onClick={handleLogoClick}
                    >
                        HARWEX AFISHA
                    </Typography>
                    {isShowSelectCity ? (
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120, marginLeft: "30px" }}>
                            <Select
                                sx={{
                                    ...whiteSelect,
                                }}
                                value={city}
                                onChange={(event) => setCity(event.target.value)}
                            >
                                <MenuItem value="Minsk">Minsk</MenuItem>
                                <MenuItem value="Vitebsk">Vitebsk</MenuItem>
                                <MenuItem value="Gomel">Gomel</MenuItem>
                            </Select>
                        </FormControl>
                    ) : null}
                    <Box sx={{ flexGrow: 1 }} />
                    <IconButton
                        size="large"
                        aria-haspopup="true"
                        color="inherit"
                        onClick={handleProfileMenuOpen}
                    >
                        <AccountCircle />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Toolbar />
            <ProfileMenu anchorEl={menuAnchor} isMenuOpen={isMenuOpen} handleMenuClose={handleMenuClose} />
        </Box>
    );
};

export default Header;
