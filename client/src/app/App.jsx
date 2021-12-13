import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Main from "../pages/main/Main";

import { routePaths } from "../common/constants/routePaths";

function App() {
    return (
        <>
            <Routes>
                <Route path={routePaths.main} element={<Main />} />
                <Route path={routePaths.notFound} element={<div>Nothing to see here</div>} />
                <Route path={routePaths.any} element={<Navigate to={routePaths.notFound} replace />} />
            </Routes>
        </>
    );
}

export default App;
