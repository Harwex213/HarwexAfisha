import React from "react";
import { useSelector } from "react-redux";
import { selectCity, selectDate } from "../../../../store/slices/afishaSlice";
import { useGetMoviesByCityAndDateQuery } from "../../../../store/api/cinemaMovie";
import { Col, Row } from "antd";
import { useNavigate } from "react-router-dom";
import "./afisha-movies.css";
import MoviePoster from "../../../../components/MoviePoster";
import capitalizeFirstLetter from "../../../../helpers/capitalizeFirstLetter";
import moment from "moment";
import lowFirstLetter from "../../../../helpers/lowFirstLetter";

const AfishaMovies = () => {
    const navigate = useNavigate();
    const date = useSelector(selectDate);
    const city = useSelector(selectCity);
    const { data: movies, isSuccess } = useGetMoviesByCityAndDateQuery({
        cityId: city.id,
        date,
    });

    if (!isSuccess) {
        return <></>;
    }

    const onMovieClick = (id) => {
        navigate(id.toString());
    };

    return (
        <div className="afisha">
            <h1 className="afisha_title">
                {capitalizeFirstLetter(city.name)}. Playbill for {moment(date).format("D, ")}
                {lowFirstLetter(moment(date).format("dddd. "))}
                {moment(date).format("MMMM")}
            </h1>
            <Row gutter={[20, 32]} type="flex">
                {movies.map((movie) => (
                    <Col onClick={() => onMovieClick(movie.id)} key={movie.id} md={6} xl={4}>
                        <div className="afisha__movie">
                            <MoviePoster
                                className="afisha__movieImg"
                                name={movie.name}
                                preview={false}
                                style={{ height: "100%" }}
                            />
                            <div className="afisha__movieImgMock" />
                            <h2 className="afisha__movieTitle">{movie.name}</h2>
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default AfishaMovies;
