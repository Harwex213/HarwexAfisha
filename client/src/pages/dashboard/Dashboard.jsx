import React from "react";
import { Link as RouterLink, Route, Routes } from "react-router-dom";
import { Box, Container, Divider, Drawer, MenuItem, MenuList } from "@mui/material";
import Cities from "../../components/dashboard/cities/Cities";
import Places from "../../components/dashboard/places/Places";
import Events from "../../components/dashboard/events/Events";
import Sessions from "../../components/dashboard/sessions/Sessions";
import { routePaths } from "../../common/constants/routePaths";

const Dashboard = () => {
    return (
        <Box sx={{ display: "flex" }} mt={5}>
            <Drawer sx={{ width: "98px" }} variant="permanent">
                <Box minHeight={64} />
                <MenuList>
                    <MenuItem component={RouterLink} to={routePaths.dashboardInner.cities}>
                        Cities
                    </MenuItem>
                    <Divider />
                    <MenuItem component={RouterLink} to={routePaths.dashboardInner.events}>
                        Events
                    </MenuItem>
                    <Divider />
                    <MenuItem component={RouterLink} to={routePaths.dashboardInner.places}>
                        Places
                    </MenuItem>
                    <Divider />
                    <MenuItem component={RouterLink} to={routePaths.dashboardInner.sessions}>
                        Sessions
                    </MenuItem>
                </MenuList>
            </Drawer>
            <Container maxWidth="lg">
                <Routes>
                    <Route path={routePaths.dashboardInner.cities} element={<Cities />} />
                    <Route path={routePaths.dashboardInner.places} element={<Places />} />
                    <Route path={routePaths.dashboardInner.events} element={<Events />} />
                    <Route path={routePaths.dashboardInner.sessions} element={<Sessions />} />
                </Routes>
            </Container>
        </Box>
    );
};

export default Dashboard;
