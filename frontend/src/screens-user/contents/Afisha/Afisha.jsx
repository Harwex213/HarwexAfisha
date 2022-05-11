import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCity } from "../../../store/slices/afishaSlice";
import AfishaMovies from "./AfishaMovies/AfishaMovies";
import Movie from "./Movie/Movie";

const AfishaPreloader = (props) => {
    const city = useSelector(selectCity);

    if (!city) {
        return <></>;
    }
    return <Afisha {...props} />;
};

const Afisha = () => {
    const location = useLocation();

    return (
        <>
            <Routes>
                <Route path="" element={<AfishaMovies />} />
                <Route path=":movieId" element={<Movie />} />
                <Route path="*" element={<Navigate to="" state={{ from: location }} replace />} />
            </Routes>
        </>
    );
};

export default AfishaPreloader;
