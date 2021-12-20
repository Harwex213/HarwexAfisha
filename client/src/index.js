import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import queryClient from "./app/queryClient";
import { AuthProvider } from "./contexts/AuthContext";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import App from "./app/App";
import "./index.css";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <AuthProvider>
                        <App />
                    </AuthProvider>
                </LocalizationProvider>
            </QueryClientProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);
