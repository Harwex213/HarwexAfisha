import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCity, setDate } from "../../../store/slices/afishaSlice";
import AfishaMovies from "./AfishaMovies/AfishaMovies";
import Movie from "./Movie/Movie";

const AfishaPreloader = (props) => {
    const city = useSelector(selectCity);
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const date = searchParams.get("date");
        if (date) {
            dispatch(setDate({ date }));
        }
    });

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
