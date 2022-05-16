import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { movie as movieApi } from "../../../../store/api/generic";
import { Divider, Image, PageHeader } from "antd";
import apiConfig from "../../../../constants/apiConfig";
import MovieCinemas from "../MovieCinemas/MovieCinemas";
import { selectDate } from "../../../../store/slices/afishaSlice";
import "./movie.css";
import moment from "moment";
import capitalizeFirstLetter from "../../../../helpers/capitalizeFirstLetter";
import MoviePoster from "../../../../components/MoviePoster";

const Movie = () => {
    const date = useSelector(selectDate);
    const navigate = useNavigate();
    const [search] = useSearchParams();
    const { movieId } = useParams();
    const {
        data: movie,
        isLoading,
        isError,
    } = movieApi.useGetByIdMovieQuery({
        id: Number(movieId),
    });

    if (isLoading) {
        return <></>;
    }

    if (isError) {
        navigate("movies");
    }

    const handleBack = () => {
        navigate({
            pathname: "/movies",
            search: search.toString(),
        });
    };

    return (
        <PageHeader onBack={handleBack} title={movie.name}>
            <div className="movie">
                <MoviePoster className="movie__image" name={movie.name} />
                <div className="movie__info">
                    <div>
                        <span>Какая-то инфа:</span> ВАУ!!!
                    </div>
                </div>
            </div>
            <div className="movieContent__description">
                <h3>Описание</h3>
                <p>{movie.description}</p>
            </div>
            <Divider />
            <div className="movieContent__sessions">
                <h2>
                    Сеансы на {moment(date).format("D [число], dddd. ")}
                    {capitalizeFirstLetter(moment(date).format("MMMM"))}
                </h2>
                <MovieCinemas movie={movie} />
            </div>
        </PageHeader>
    );
};

export default Movie;
