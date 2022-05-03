import React, { useState } from "react";
import { Col, Row } from "antd";
import "./seats.css";
import SeatIcon from "./SeatIcon";

const Seats = ({ rows, cols, onSelect }) => {
    const [selectedSeat, setSelectedSeat] = useState([-1, -1]);

    const handleSeatClick = (rowIndex, colIndex) => {
        if (selectedSeat[0] === rowIndex && selectedSeat[1] === colIndex) {
            setSelectedSeat([-1, -1]);
            return;
        }
        setSelectedSeat([rowIndex, colIndex]);
        onSelect([rowIndex, colIndex]);
    };

    return (
        <>
            {Array(rows)
                .fill(0)
                .map((value, rowIndex) => {
                    return (
                        <Row className="seatRow" key={rowIndex} gutter={6}>
                            {Array(cols)
                                .fill(0)
                                .map((value, colIndex) => {
                                    return (
                                        <Col key={colIndex}>
                                            <SeatIcon
                                                className={
                                                    selectedSeat[0] === rowIndex &&
                                                    selectedSeat[1] === colIndex
                                                        ? "seat seat__selected"
                                                        : "seat"
                                                }
                                                onClick={() => handleSeatClick(rowIndex, colIndex)}
                                            />
                                        </Col>
                                    );
                                })}
                        </Row>
                    );
                })}
        </>
    );
};

export default Seats;
