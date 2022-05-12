import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "antd/dist/antd.variable.css";
import "./index.css";
import App from "./app/App";
import { store } from "./store/store";
import { Provider } from "react-redux";
import moment from "moment";
import "moment/locale/ru";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { ConfigProvider } from "antd";

ConfigProvider.config({
    theme: {
        primaryColor: "#ff4d4f",
    },
});

library.add(fas);

moment.locale("ru");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
