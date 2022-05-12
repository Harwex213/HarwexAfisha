import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, notification } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Seats from "../../../components/Seats/Seats";
import { hall as hallApi } from "../../../../store/api/generic";
import { useGetSessionOrderedSeatsQuery } from "../../../../store/api/session";
import { useOrderTicketMutation } from "../../../../store/api/ticket";
import { selectUser } from "../../../../store/slices/userSlice";
import { userRoles } from "../../../../constants/userRoles";
import "./orderTicket.css";
import moment from "moment";

const OrderTicket = ({ session, setModalWidth, onOrder }) => {
    const user = useSelector(selectUser);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [selectedSeat, setSelectedSeat] = useState([-1, -1]);
    const { data: hall } = hallApi.useGetByIdHallQuery({
        id: session.hallId,
    });
    const { data: ordered } = useGetSessionOrderedSeatsQuery({
        sessionId: session.id,
    });
    const [orderTicketMutation] = useOrderTicketMutation();

    useEffect(() => {
        if (hall) {
            setModalWidth(hall.cols * 26 + 400);
        }
    });

    if (!hall) {
        return (
            <div className="orderTicket">
                <div className="orderTicket__preloader">
                    <LoadingOutlined />
                </div>
            </div>
        );
    }

    const orderTicket = async () => {
        if (user.role === userRoles.GUEST) {
            navigate("/login");
            return;
        }

        setLoading(true);
        try {
            await orderTicketMutation({
                sessionId: session.id,
                userId: -1,
                row: selectedSeat[0],
                position: selectedSeat[1],
            }).unwrap();

            onOrder();
        } catch (e) {
            notification["error"]({
                message: "Ошибка",
                description: e.data?.message ?? e.message,
                placement: "topLeft",
            });
        }
        setLoading(false);
    };

    return (
        <div className="orderTicket">
            <div className="orderTicket__body">
                <div>
                    <h3 className="orderTicket__title">Выбор места</h3>
                    <Seats
                        rows={hall.rows}
                        cols={hall.cols}
                        ordered={ordered || []}
                        selectedSeat={selectedSeat}
                        setSelectedSeat={setSelectedSeat}
                    />
                </div>
                <div className="orderTicket__info">
                    <h3 className="orderTicket__title">Информация о сеансе</h3>
                    <div>
                        <p>
                            Зал: <span>{hall.name}</span>
                        </p>
                        <p>
                            Время: <span>{moment(session.time).format("HH:mm")}</span>
                        </p>
                        <p>
                            Цена: <span>{session.price} руб.</span>
                        </p>
                        <p>
                            Выбранное место:{" "}
                            <span>
                                {selectedSeat[0] === -1
                                    ? ""
                                    : `${selectedSeat[0] + 1} ряд. ${selectedSeat[1] + 1} место`}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <Button
                className="orderTicket__orderButton"
                type="primary"
                disabled={selectedSeat[0] === -1}
                onClick={orderTicket}
                loading={loading}
            >
                Заказать
            </Button>
        </div>
    );
};

export default OrderTicket;
