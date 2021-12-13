import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import RoleRoute from "../routes/RoleRoute";

import Main from "../pages/main/Main";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Poster from "../pages/poster/Poster";
import Profile from "../pages/profile/Profile";
import Dashboard from "../pages/dashboard/Dashboard";
import Header from "../components/header/Header";

import { routePaths } from "../common/constants/routePaths";
import { userRoles } from "../common/constants/users";

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path={routePaths.main} element={<Main />} />
                <Route
                    path={routePaths.login}
                    element={
                        <RoleRoute roles={[userRoles.guest]} navigateTo={routePaths.main}>
                            <Login />
                        </RoleRoute>
                    }
                />
                <Route
                    path={routePaths.register}
                    element={
                        <RoleRoute roles={[userRoles.guest]} navigateTo={routePaths.main}>
                            <Register />
                        </RoleRoute>
                    }
                />
                <Route
                    path={routePaths.poster}
                    element={
                        <RoleRoute roles={[userRoles.guest, userRoles.user]} navigateTo={routePaths.main}>
                            <Poster />
                        </RoleRoute>
                    }
                />
                <Route
                    path={routePaths.profile}
                    element={
                        <RoleRoute roles={[userRoles.user]} navigateTo={routePaths.main}>
                            <Profile />
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
        </>
    );
}

export default App;
