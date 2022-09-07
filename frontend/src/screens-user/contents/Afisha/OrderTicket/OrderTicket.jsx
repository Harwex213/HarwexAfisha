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
import capitalizeFirstLetter from "../../../../helpers/capitalizeFirstLetter";

const OrderTicket = ({ cinema, session, city, movie, setModalWidth, onOrder }) => {
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
                ticket: {
                    sessionId: Number(session.id),
                    userId: -1,
                    row: selectedSeat[0],
                    position: selectedSeat[1],
                },
                emailInfo: {
                    time:
                        moment(session.time).format("HH:mm. D [day], dddd. ") +
                        capitalizeFirstLetter(moment(session.time).format("MMMM")),
                    movieName: movie.name,
                    cinemaName: cinema.name,
                    cityName: city.name,
                    hallName: hall.name,
                    row: selectedSeat[0] + 1,
                    seat: selectedSeat[1] + 1,
                    price: session.price + " BYN",
                },
            }).unwrap();

            onOrder();

            navigate("/tickets");
            notification["success"]({
                message: "Successfully ordered",
                placement: "topLeft",
            });
        } catch (e) {
            notification["error"]({
                message: "Something going wrong",
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
                    <h3 className="orderTicket__title">Seat choosing</h3>
                    <Seats
                        rows={hall.rows}
                        cols={hall.cols}
                        ordered={ordered || []}
                        selectedSeat={selectedSeat}
                        setSelectedSeat={setSelectedSeat}
                    />
                </div>
                <div className="orderTicket__info">
                    <h3 className="orderTicket__title">Session information</h3>
                    <div>
                        <p>
                            Hall: <span>{hall.name}</span>
                        </p>
                        <p>
                            Time: <span>{moment(session.time).format("HH:mm")}</span>
                        </p>
                        <p>
                            Price: <span>{session.price} руб.</span>
                        </p>
                        <p>
                            Selected seat:{" "}
                            <span>
                                {selectedSeat[0] === -1
                                    ? ""
                                    : `${selectedSeat[0] + 1} row. ${selectedSeat[1] + 1} place`}
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
                Order
            </Button>
        </div>
    );
};

export default OrderTicket;
