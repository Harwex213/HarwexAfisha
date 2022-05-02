import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminScreen from "../screens-admin/AdminScreen";
import UserScreen from "../screens-user/UserScreen";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<UserScreen />} />
            <Route path="/admin" element={<AdminScreen />} />
        </Routes>
    );
};

export default App;
