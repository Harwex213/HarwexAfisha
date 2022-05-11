import React from "react";
import { useSelector } from "react-redux";
import { selectCity, selectDate } from "../../../../store/slices/afishaSlice";
import { useGetMoviesByCityAndDateQuery } from "../../../../store/api/cinemaMovie";
import { Card, Col, Image, Row } from "antd";
import apiConfig from "../../../../constants/apiConfig";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./afisha-movies.css";

const AfishaMovies = () => {
    const navigate = useNavigate();
    const [search] = useSearchParams();
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
        navigate({
            pathname: id.toString(),
            search: search.toString(),
        });
    };

    return (
        <div className="afisha">
            <h4 className="afisha_title">
                Все фильмы в {city.name} на {date}
            </h4>
            <Row gutter={[32, 24]}>
                {movies.map((movie) => (
                    <Col onClick={() => onMovieClick(movie.id)} key={movie.id} md={6} xl={4}>
                        <Card
                            hoverable
                            cover={
                                <Image
                                    preview={false}
                                    alt="movie-poster"
                                    src={`${apiConfig.baseUrl}static/movie/${movie.id}/poster.jpg`}
                                />
                            }
                            bordered={false}
                        >
                            <Card.Meta title={<h2 className="afisha__movieTitle">{movie.name}</h2>} />
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default AfishaMovies;
