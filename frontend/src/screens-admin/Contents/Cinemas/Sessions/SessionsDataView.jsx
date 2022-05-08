import React, { useState } from "react";
import { session } from "../../../../store/api/generic";
import { BackTop, Button, Divider, Drawer, notification, Space, Table } from "antd";
import { useGetSessionsByHallAndDateQuery } from "../../../../store/api/session";
import CreateFormSession from "./CreateFormSession";
import UpdateFormSession from "./UpdateFormSession";
import moment from "moment";

const initialValues = {
    time: "",
    price: 0.99,
    ticketsOrdered: 0,
};

const columns = [
    { title: "Id", dataIndex: "id", key: "id" },
    { title: "Movie", dataIndex: "movieName", key: "movieName" },
    {
        title: "Time",
        key: "time",
        render: (text, record) => moment(record.time).format("HH:mm:ss"),
    },
    { title: "Price", dataIndex: "price", key: "price" },
    { title: "Actions", key: "actions" },
];

const ACTIONS_INDEX = 4;

const SessionsDataView = ({ cinema, hall, date }) => {
    const [formInitialValues, setFormInitialValues] = useState({
        ...initialValues,
        hallId: hall.id,
        cinemaId: cinema.id,
        date,
    });
    const [createFormVisible, setCreateFormVisible] = useState(false);
    const [updateFormVisible, setUpdateFormVisible] = useState(false);
    const { data, isLoading: isDataLoading } = useGetSessionsByHallAndDateQuery({
        hallId: hall.id,
        date,
        includeMovie: true,
    });
    const [deleteSession] = session.useDeleteSessionMutation();

    const onCreateSubmit = () => {
        setCreateFormVisible(false);

        notification["success"]({
            message: "Success.",
            placement: "topLeft",
        });
    };
    const onUpdateSubmit = () => {
        setUpdateFormVisible(false);

        notification["success"]({
            message: "Success.",
            placement: "topLeft",
        });
    };

    const handleCreate = () => {
        setFormInitialValues({ ...initialValues, hallId: hall.id, cinemaId: cinema.id, date });
        setCreateFormVisible(true);
    };
    const handleEdit = (event, record) => {
        event.preventDefault();

        setFormInitialValues({ ...record, cinemaId: cinema.id, date });
        setUpdateFormVisible(true);
    };
    const handleDelete = async (event, id) => {
        event.preventDefault();

        try {
            await deleteSession({ id }).unwrap();

            notification["success"]({
                message: "Success.",
                placement: "topLeft",
            });
        } catch (e) {
            notification["error"]({
                message: "Cannot delete",
                description: e.data?.message ?? e.message,
                placement: "topLeft",
            });
        }
    };

    const isActionDisabled = moment(date) < moment().endOf("day").add(-1, "day");

    columns[ACTIONS_INDEX].render = (text, record) => (
        <Space size="middle">
            <Button type="default" disabled={isActionDisabled} onClick={(event) => handleEdit(event, record)}>
                Edit
            </Button>
            <Button type="default" danger onClick={(event) => handleDelete(event, record.id)}>
                Delete
            </Button>
        </Space>
    );

    return (
        <div>
            <BackTop />
            <div>
                <h4>Actions</h4>
                <Button type="primary" disabled={isActionDisabled} onClick={handleCreate}>
                    Add session
                </Button>
            </div>
            <Divider />
            <Drawer
                width={450}
                title="Add session"
                placement="right"
                onClose={() => setCreateFormVisible(false)}
                visible={createFormVisible}
                destroyOnClose
            >
                <CreateFormSession initialValues={formInitialValues} onSubmit={onCreateSubmit} />
            </Drawer>
            <Drawer
                width={450}
                title="Update session"
                placement="right"
                onClose={() => setUpdateFormVisible(false)}
                visible={updateFormVisible}
                destroyOnClose
            >
                <UpdateFormSession initialValues={formInitialValues} onSubmit={onUpdateSubmit} />
            </Drawer>
            {isDataLoading ? (
                <div>Loading...</div>
            ) : (
                <Table columns={columns} dataSource={data.rows} rowKey="id" bordered />
            )}
        </div>
    );
};

export default SessionsDataView;
