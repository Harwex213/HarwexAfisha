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
        title: "Фильм",
        key: "movieName",
        render: (text, record) => <Link to={`/movies/${record.movieId}`}>{record.movieName}</Link>,
    },
    { title: "Кинотеатр", dataIndex: "cinemaName", key: "cinemaName" },
    { title: "Город", dataIndex: "cityName", key: "cityName" },
    { title: "Зал", dataIndex: "hallName", key: "hallName" },
    { title: "Ряд", dataIndex: "row", render: (text, record) => record.row + 1 },
    { title: "Место", dataIndex: "position", render: (text, record) => record.position + 1 },
    {
        title: "Время",
        key: "time",
        render: (text, record) => moment(record.sessionTime).format(" HH:mm. D [число], MMMM. YYYY год"),
    },
    { title: "Цена (руб.)", dataIndex: "sessionPrice", key: "sessionPrice" },
    { title: "Действия", key: "actions" },
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
                message: "Успешно возвращено",
                placement: "topLeft",
            });
        } catch (e) {
            notification["error"]({
                message: "Ошибка",
                description: e.data?.message ?? e.message,
                placement: "topLeft",
            });
        }
    };

    columns[ACTIONS_INDEX].render = (text, record) => (
        <Space size="middle">
            <Button onClick={() => handleReturnBack(record.id)} type="default">
                Вернуть Билет
            </Button>
        </Space>
    );

    return (
        <div className="tickets">
            <h1 className="tickets__header">Заказанные билеты</h1>
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
