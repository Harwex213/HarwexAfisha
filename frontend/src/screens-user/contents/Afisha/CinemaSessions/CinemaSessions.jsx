import React, { useState } from "react";
import { Button, Modal, Space, Tooltip } from "antd";
import moment from "moment";
import OrderTicket from "../OrderTicket/OrderTicket";
import "./cinemaSessions.css";
import SessionButtonIcon from "./SessionButtonIcon";

const CinemaSessions = ({ cinema, movie, city }) => {
    const { sessions } = cinema;
    const [modalWidth, setModalWidth] = useState(700);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedSession, setSelectedSession] = useState(null);

    const handleSessionClick = (session) => {
        setIsModalVisible(true);
        setSelectedSession(session);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const handleOk = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <Space size="small">
                {sessions?.map((session) => {
                    const disabled = session.isAllTicketsOrdered || moment(session.time) < moment();
                    return (
                        <div
                            key={session.id}
                            onClick={disabled ? null : () => handleSessionClick(session)}
                            className="session"
                        >
                            <Tooltip placement="bottom" title={`${session.price} руб.`}>
                                <Button size="large" disabled={disabled} type="link">
                                    <SessionButtonIcon className="session__buttonIcon" />
                                    {moment(session.time).format("HH:mm")}
                                </Button>
                            </Tooltip>
                        </div>
                    );
                })}
            </Space>
            <Modal
                title="Ticket ordering"
                width={modalWidth}
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                destroyOnClose
            >
                <OrderTicket
                    movie={movie}
                    city={city}
                    cinema={{ id: cinema.id, name: cinema.name }}
                    session={selectedSession}
                    setModalWidth={setModalWidth}
                    onOrder={handleOk}
                />
            </Modal>
        </>
    );
};

export default CinemaSessions;
