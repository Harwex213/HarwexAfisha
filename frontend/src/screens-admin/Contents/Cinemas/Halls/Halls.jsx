import React, { useState } from "react";
import useLocalStorage from "../../../../hooks/useLocalStorageState";
import useGetColumnsFromSchema from "../../../../hooks/useGetColumnsFromSchema";
import { hall } from "../../../../store/api/generic";
import { BackTop, Button, Drawer, notification, Space, Table } from "antd";
import FormHall from "./FormHall";

const initialValues = {
    name: "",
    rows: 1,
    cols: 3,
};

const Halls = ({ cinema }) => {
    const [formInitialValues, setFormInitialValues] = useState({ ...initialValues, cinemaId: cinema.id });
    const [formVisible, setFormVisible] = useState(false);
    const [isCreateForm, setIsCreateForm] = useState(false);
    const [page, setPage] = useLocalStorage("hallsPage", 1);
    const { data: columns, isLoading: isSchemaLoading } = useGetColumnsFromSchema({
        schemaName: "hall",
        toExclude: ["cinemaId"],
    });
    const { data, isLoading: isDataLoading } = hall.useGetHallQuery({
        page: page - 1,
        where: {
            cinemaId: cinema.id,
        },
    });
    const [deleteHall] = hall.useDeleteHallMutation();

    const onSubmit = () => {
        setFormVisible(false);

        notification["success"]({
            message: "Success.",
            placement: "topLeft",
        });
    };

    const handleCreate = () => {
        setFormInitialValues({ ...initialValues, cinemaId: cinema.id });
        setFormVisible(true);
        setIsCreateForm(true);
    };
    const handleEdit = (event, record) => {
        event.preventDefault();

        setFormInitialValues({ ...record });
        setFormVisible(true);
        setIsCreateForm(false);
    };
    const handleDelete = async (event, id) => {
        event.preventDefault();

        try {
            await deleteHall({ id }).unwrap();

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

    columns.push({
        title: "Actions",
        key: "actions",
        render: (text, record) => (
            <Space size="middle">
                <a onClick={(event) => handleEdit(event, record)}>Edit</a>
                <a onClick={(event) => handleDelete(event, record.id)}>Delete</a>
            </Space>
        ),
    });

    return (
        <div>
            <BackTop />
            <Button type="primary" onClick={handleCreate}>
                Add hall
            </Button>
            <Drawer
                width={450}
                title={isCreateForm ? "Add hall" : "Update hall"}
                placement="right"
                onClose={() => setFormVisible(false)}
                visible={formVisible}
                destroyOnClose
            >
                <FormHall isCreateForm={isCreateForm} initialValues={formInitialValues} onSubmit={onSubmit} />
            </Drawer>
            {isSchemaLoading || isDataLoading ? (
                <div>Loading...</div>
            ) : (
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
            )}
        </div>
    );
};

export default Halls;
