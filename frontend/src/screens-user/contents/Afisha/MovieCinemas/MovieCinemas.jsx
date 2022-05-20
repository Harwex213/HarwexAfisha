import React from "react";
import { List } from "antd";
import { useGetCinemasByCityDateMovieQuery } from "../../../../store/api/cinemaMovie";
import CinemaSessions from "../CinemaSessions/CinemaSessions";
import "./movieCinemas.css";

const MovieCinemas = ({ movie, date, city }) => {
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
