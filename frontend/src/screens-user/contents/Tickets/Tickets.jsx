import React, { useState } from "react";
import moment from "moment";
import { Button, Space, Table } from "antd";
import { useGetUserTicketsQuery } from "../../../store/api/ticket";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/slices/userSlice";
import "./tickets.css";

const columns = [
    { title: "Фильм", dataIndex: "movieName", key: "movieName" },
    { title: "Ряд", dataIndex: "row", render: (text, record) => record.row + 1 },
    { title: "Место", dataIndex: "position", render: (text, record) => record.position + 1 },
    {
        title: "Время",
        key: "time",
        render: (text, record) => moment(record.sessionTime).format("D [число], MMMM. YYYY год"),
    },
    { title: "Цена (руб.)", dataIndex: "sessionPrice", key: "sessionPrice" },
    { title: "Действия", key: "actions" },
];

const ACTIONS_INDEX = columns.length - 1;

const Tickets = () => {
    const user = useSelector(selectUser);
    const [page, setPage] = useState(1);
    const { data, isSuccess } = useGetUserTicketsQuery({
        userId: user.id,
        offset: page - 1,
        thresholdDate: moment().endOf("day").add(-1, "day").format("YYYY-MM-DD"),
        isBefore: false,
    });

    columns[ACTIONS_INDEX].render = (text, record) => (
        <Space size="middle">
            <Button type="default" danger>
                Вернуть
            </Button>
        </Space>
    );

    return (
        <div className="tickets">
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
