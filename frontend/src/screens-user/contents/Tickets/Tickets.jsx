import React, { useState, useEffect } from "react";
import moment from "moment";
import { Button, notification, Space, Table } from "antd";
import { useGetUserTicketsQuery, useReturnBackMutation } from "../../../store/api/ticket";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../store/slices/userSlice";
import "./tickets.css";
import { setNoneRoute } from "../../../store/slices/afishaSlice";
import { Link } from "react-router-dom";

const columns = [
    {
        title: "Movie",
        key: "movieName",
        render: (text, record) => (
            <Link
                to={`/movies/${record.movieId}?time=${record.sessionTime}&cityId=${record.cityId}&cityName=${record.cityName}`}
            >
                {record.movieName}
            </Link>
        ),
    },
    { title: "Cinema", dataIndex: "cinemaName", key: "cinemaName" },
    { title: "City", dataIndex: "cityName", key: "cityName" },
    { title: "Hall", dataIndex: "hallName", key: "hallName" },
    { title: "Row", dataIndex: "row", render: (text, record) => record.row + 1 },
    { title: "Place", dataIndex: "position", render: (text, record) => record.position + 1 },
    {
        title: "Time",
        key: "time",
        render: (text, record) => moment(record.sessionTime).format(" HH:mm. D [число], MMMM. YYYY год"),
    },
    { title: "Price (BYN)", dataIndex: "sessionPrice", key: "sessionPrice" },
    { title: "Actions", key: "actions" },
];

const ACTIONS_INDEX = columns.length - 1;

const Tickets = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const [page, setPage] = useState(1);
    const { data, isSuccess } = useGetUserTicketsQuery({
        userId: user.id,
        offset: page - 1,
        thresholdDate: moment().endOf("day").add(-1, "day").format("YYYY-MM-DD"),
        isBefore: false,
    });
    const [returnBack] = useReturnBackMutation();

    useEffect(() => {
        dispatch(setNoneRoute());
    });

    const handleReturnBack = async (id) => {
        try {
            await returnBack({ id }).unwrap();

            notification["success"]({
                message: "Successfully returned back",
                placement: "topLeft",
            });
        } catch (e) {
            notification["error"]({
                message: "Something going wrong",
                description: e.data?.message ?? e.message,
                placement: "topLeft",
            });
        }
    };

    columns[ACTIONS_INDEX].render = (text, record) => (
        <Space size="middle">
            <Button onClick={() => handleReturnBack(record.id)} type="default">
                Return ticket back
            </Button>
        </Space>
    );

    return (
        <div className="tickets">
            <h1 className="tickets__header">Ordered tickets</h1>
            {isSuccess ? (
                <Table
                    columns={columns}
                    dataSource={data.rows}
                    rowKey="id"
                    bordered
                    pagination={{
                        current: page,
                        onChange: (page) => setPage(page),
                        pageSize: 15,
                        showSizeChanger: false,
                        total: data.count,
                        position: ["topLeft", "bottomLeft"],
                    }}
                />
            ) : (
                "Loading.."
            )}
        </div>
    );
};

export default Tickets;
