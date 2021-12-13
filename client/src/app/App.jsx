import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Main from "../pages/main/Main";

import { routePaths } from "../common/constants/routePaths";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={routePaths.main} element={<Main />} />
                <Route path={routePaths.notFound} element={<div>Nothing to see here</div>} />
                <Route path={routePaths.any} element={<Navigate to={routePaths.notFound} replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
