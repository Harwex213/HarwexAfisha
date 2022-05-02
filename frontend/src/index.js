import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./app/App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);

// TODO: scaffold skeleton
//  - берем/делаем Header
//      - добавляем его в Admin + User скрины
//  - в Admin скрин добавляем left navbar (внутренний компонент)
//  - туда пихаем то, как мы рисовали в блокноте. body скрина - какие-нибудь заглушки
//  - прикрутить редакс сторку, накатить экшоны
