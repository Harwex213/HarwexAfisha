import React from "react";
import { useSelector } from "react-redux";
import { Button, Space } from "antd";
import moment from "moment";
import { useGetSessionsByCinemaDateMovieQuery } from "../../../../store/api/session";
import { selectDate } from "../../../../store/slices/afishaSlice";
import "./cinemaSessions.css";

const CinemaSessions = ({ cinema, movie }) => {
    const date = useSelector(selectDate);
    const { data: sessions } = useGetSessionsByCinemaDateMovieQuery({
        cinemaId: cinema.id,
        movieId: movie.id,
        date,
    });

    return (
        <Space size="middle">
            {sessions?.map((session) => (
                <div key={session.id} className="session">
                    <Button type="default">{moment(session.time).format("HH:mm")}</Button>
                    <p className="session__price">{session.price} руб.</p>
                </div>
            ))}
        </Space>
    );
};

export default CinemaSessions;
