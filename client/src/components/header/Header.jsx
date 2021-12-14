import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { ProfileMenu } from "../profileMenu/ProfileMenu";
import { routePaths } from "../../common/constants/routePaths";
import { underlinedHover } from "../../common/styles/material";

const Header = () => {
    const navigate = useNavigate();
    const [menuAnchor, setMenuAnchor] = useState(null);

    const isMenuOpen = Boolean(menuAnchor);

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
