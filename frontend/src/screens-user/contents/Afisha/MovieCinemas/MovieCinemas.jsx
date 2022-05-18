import React from "react";
import { useSelector } from "react-redux";
import { selectCity, selectDate } from "../../../../store/slices/afishaSlice";
import { List } from "antd";
import { useGetCinemasByCityDateMovieQuery } from "../../../../store/api/cinemaMovie";
import CinemaSessions from "../CinemaSessions/CinemaSessions";
import "./movieCinemas.css";

const MovieCinemas = ({ movie }) => {
    const date = useSelector(selectDate);
    const city = useSelector(selectCity);
    const { data: cinemas } = useGetCinemasByCityDateMovieQuery({
        date: date,
        cityId: city.id,
        movieId: movie.id,
    });

    return (
        <List
            dataSource={cinemas?.filter((cinema) => !!cinema.sessions.length)}
            renderItem={(cinema) => (
                <List.Item className="cinema">
                    <h3 className="cinema__title">{cinema.name}: </h3>
                    <CinemaSessions sessions={cinema.sessions} />
                </List.Item>
            )}
        />
    );
};

export default MovieCinemas;
