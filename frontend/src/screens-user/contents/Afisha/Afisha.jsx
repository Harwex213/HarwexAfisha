import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCity, setAfishaRoute } from "../../../store/slices/afishaSlice";
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
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setAfishaRoute());
    });

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
