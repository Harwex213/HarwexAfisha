import React from "react";
import { useSelector } from "react-redux";
import { selectCity, selectDate } from "../../../store/slices/afishaSlice";
import "./afisha.css";

const AfishaPreloader = (props) => {
    const city = useSelector(selectCity);
    if (!city) {
        return <></>;
    }
    return <Afisha {...props} />;
};

const Afisha = () => {
    const date = useSelector(selectDate);
    const city = useSelector(selectCity);

    return <div>aga zdarova!</div>;
};

export default AfishaPreloader;
