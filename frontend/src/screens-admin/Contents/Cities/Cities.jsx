import React, { useState } from "react";
import { BackTop, Button, Drawer, notification, Space, Table } from "antd";
import useGetColumnsFromSchema from "../../../hooks/useGetColumnsFromSchema";
import useLocalStorage from "../../../hooks/useLocalStorageState";
import { city } from "../../../store/api/generic";
import FormCity from "./FormCity";

const initialValues = {
    name: "",
};

const Cities = () => {
    const [formInitialValues, setFormInitialValues] = useState(initialValues);
    const [formVisible, setFormVisible] = useState(false);
    const [isCreateForm, setIsCreateForm] = useState(false);
    const [page, setPage] = useLocalStorage("cityPage", 1);
    const { data: columns, isLoading: isSchemaLoading } = useGetColumnsFromSchema({ schemaName: "city" });
    const { data, isLoading: isDataLoading } = city.useGetCityQuery({ page: page - 1 });
    const [deleteCity] = city.useDeleteCityMutation();

    const onSubmit = () => {
        setFormVisible(false);
        notification["success"]({
            message: "Success.",
        });
    };

    const handleCreate = () => {
        setFormInitialValues({ ...initialValues });
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
            await deleteCity({ id }).unwrap();

            notification["success"]({
                message: "Success.",
            });
        } catch (e) {
            notification["error"]({
                message: "Cannot delete",
                description: e.data?.message ?? e.message,
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
                Add city
            </Button>
            <Drawer
                width={450}
                title={isCreateForm ? "Add City" : "Update City"}
                placement="right"
                onClose={() => setFormVisible(false)}
                visible={formVisible}
                destroyOnClose
            >
                <FormCity isCreateForm={isCreateForm} initialValues={formInitialValues} onSubmit={onSubmit} />
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

export default Cities;
