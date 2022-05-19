import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { movie as movieApi } from "../../../../store/api/generic";
import MovieCinemas from "../MovieCinemas/MovieCinemas";
import { selectCity, selectDate } from "../../../../store/slices/afishaSlice";
import "./movie.css";
import moment from "moment";
import capitalizeFirstLetter from "../../../../helpers/capitalizeFirstLetter";
import MoviePoster from "../../../../components/MoviePoster";
import { ArrowLeftOutlined, StarFilled } from "@ant-design/icons";
import zeroTime from "../../../../constants/zeroTime";
import { Divider } from "antd";
import { useGetRatingsQuery } from "../../../../store/api/rating";

const Movie = () => {
    const date = useSelector(selectDate);
    const city = useSelector(selectCity);
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
    const { data: rating } = useGetRatingsQuery(
        { kinopoiskId: movie?.kinopoiskId },
        { skip: isLoading || isError }
    );

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
        <div className="movieContent">
            <div className="movie__infoHeader">
                <ArrowLeftOutlined onClick={handleBack} className="movie__backIcon" />
                <h1 className="movie__name">{movie.name}</h1>
            </div>
            <div className="movie">
                <div>
                    <MoviePoster
                        className="movie__image"
                        name={movie.name}
                        style={{ borderRadius: "10px" }}
                    />
                </div>
                <div className="movie__infoContainer">
                    <div className="movie__info">
                        <Divider style={{ marginTop: "0" }} />
                        <div className="movie__infoRow">
                            <p>Рейтинг на Кинопоиске: </p>
                            <p>
                                {rating && (
                                    <>
                                        {rating.ratingKinopoisk}
                                        <StarFilled className="movie__ratingIcon" />
                                    </>
                                )}
                            </p>
                        </div>
                        <div className="movie__infoRow">
                            <p>Рейтинг на IMDB: </p>
                            <p>
                                {rating && (
                                    <>
                                        {rating.ratingImdb}
                                        <StarFilled className="movie__ratingIcon" />
                                    </>
                                )}
                            </p>
                        </div>
                        <div className="movie__infoRow">
                            <p>Возрастные ограничения: </p>
                            <p>{movie.age}+</p>
                        </div>
                        <div className="movie__infoRow">
                            <p>Длительность: </p>
                            <p>
                                {movie.duration} мин. /{" "}
                                {zeroTime.clone().add(movie.duration, "minute").format("HH:mm")}
                            </p>
                        </div>
                        <Divider />
                    </div>
                    <h2>
                        {capitalizeFirstLetter(city.name)}. Сеансы на{" "}
                        {moment(date).format("D [число], dddd. ")}
                        {capitalizeFirstLetter(moment(date).format("MMMM"))}
                    </h2>
                    <MovieCinemas movie={movie} />
                </div>
            </div>
            <div className="movieContent__description">
                <h3>Описание</h3>
                <p>{movie.description}</p>
            </div>
        </div>
    );
};

export default Movie;
