import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import RoleRoute from "../routes/RoleRoute";

import Main from "../pages/main/Main";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Posters from "../pages/posters/Posters";
import Profile from "../pages/profile/Profile";
import Dashboard from "../pages/dashboard/Dashboard";
import Header from "../components/header/Header";

import { routePaths } from "../common/constants/routePaths";
import { userRoles } from "../common/constants/users";
import { Box, Container } from "@mui/material";

function App() {
    return (
        <>
            <Header />
            <Box>
                <Routes>
                    <Route path={routePaths.main} element={<Main />} />
                    <Route
                        path={routePaths.login}
                        element={
                            <RoleRoute roles={[userRoles.guest]} navigateTo={routePaths.main}>
                                <Container maxWidth="lg">
                                    <Login />
                                </Container>
                            </RoleRoute>
                        }
                    />
                    <Route
                        path={routePaths.register}
                        element={
                            <RoleRoute roles={[userRoles.guest]} navigateTo={routePaths.main}>
                                <Container maxWidth="lg">
                                    <Register />
                                </Container>
                            </RoleRoute>
                        }
                    />
                    <Route
                        path={`${routePaths.posters}/*`}
                        element={
                            <RoleRoute roles={[userRoles.guest, userRoles.user]} navigateTo={routePaths.main}>
                                <Container maxWidth="lg">
                                    <Posters />
                                </Container>
                            </RoleRoute>
                        }
                    />
                    <Route
                        path={routePaths.profile}
                        element={
                            <RoleRoute roles={[userRoles.user]} navigateTo={routePaths.login}>
                                <Container maxWidth="lg">
                                    <Profile />
                                </Container>
                            </RoleRoute>
                        }
                    />
                    <Route
                        path={routePaths.dashboard}
                        element={
                            <RoleRoute roles={[userRoles.manager]} navigateTo={routePaths.main}>
                                <Dashboard />
                            </RoleRoute>
                        }
                    />
                    <Route path={routePaths.notFound} element={<div>Nothing to see here</div>} />
                    <Route path={routePaths.any} element={<Navigate to={routePaths.notFound} replace />} />
                </Routes>
            </Box>
        </>
    );
}

export default App;
