import React from "react";
import { Col, Row } from "antd";
import SeatIcon from "./SeatIcon";
import "./seats.css";

const Seats = ({ rows, cols, ordered, selectedSeat, setSelectedSeat }) => {
    const handleSeatClick = (rowIndex, colIndex) => {
        if (selectedSeat[0] === rowIndex && selectedSeat[1] === colIndex) {
            setSelectedSeat([-1, -1]);
            return;
        }
        setSelectedSeat([rowIndex, colIndex]);
    };

    const getSeatClassName = (rowIndex, colIndex, col) => {
        if (col === 1) {
            return "seat seat_ordered";
        }

        return selectedSeat[0] === rowIndex && selectedSeat[1] === colIndex
            ? "seat seat_selected"
            : "seat seat_selectable";
    };

    const seats = Array(rows)
        .fill(0)
        .map(() => Array(cols).fill(0));
    for (const order of ordered) {
        const [row, position] = order;
        seats[row][position] = 1;
    }

    return (
        <div>
            {seats.map((row, rowIndex) => (
                <Row className="seatRow" key={rowIndex} gutter={6}>
                    {row.map((col, colIndex) => (
                        <Col key={colIndex}>
                            <SeatIcon
                                className={getSeatClassName(rowIndex, colIndex, col)}
                                onClick={col === 0 ? () => handleSeatClick(rowIndex, colIndex) : null}
                            />
                        </Col>
                    ))}
                </Row>
            ))}
        </div>
    );
};

export default Seats;
