import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Modal, notification, Space } from "antd";
import moment from "moment";
import { useGetSessionsByCinemaDateMovieQuery } from "../../../../store/api/session";
import { selectDate } from "../../../../store/slices/afishaSlice";
import OrderTicket from "../OrderTicket/OrderTicket";
import "./cinemaSessions.css";

const CinemaSessions = ({ cinema, movie }) => {
    const [modalWidth, setModalWidth] = useState(700);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedSession, setSelectedSession] = useState(null);
    const date = useSelector(selectDate);
    const { data: sessions } = useGetSessionsByCinemaDateMovieQuery({
        cinemaId: cinema.id,
        movieId: movie.id,
        date,
    });

    const handleSessionClick = (session) => {
        setIsModalVisible(true);
        setSelectedSession(session);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const handleOk = () => {
        setIsModalVisible(false);

        notification["success"]({
            message: "Успех",
            placement: "topLeft",
        });
    };

    return (
        <>
            <Space size="middle">
                {sessions?.map((session) => (
                    <div key={session.id} onClick={() => handleSessionClick(session)} className="session">
                        <Button
                            disabled={session.isAllTicketsOrdered || moment(session.time) < moment()}
                            type="default"
                        >
                            {moment(session.time).format("HH:mm")}
                        </Button>
                        <p className="session__price">{session.price} руб.</p>
                    </div>
                ))}
            </Space>
            <Modal
                title="Заказ билета"
                width={modalWidth}
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                destroyOnClose
            >
                <OrderTicket session={selectedSession} setModalWidth={setModalWidth} onOrder={handleOk} />
            </Modal>
        </>
    );
};

export default CinemaSessions;
