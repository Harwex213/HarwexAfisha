import React, { useState } from "react";
import { BackTop, Button, Drawer, notification, Space, Table } from "antd";
import useGetColumnsFromSchema from "../../../hooks/useGetColumnsFromSchema";
import useLocalStorage from "../../../hooks/useLocalStorageState";
import { cinema } from "../../../store/api/generic";
import FormCinema from "./FormCinema";

const initialValues = {
    name: "",
    about: "",
    cityId: "",
};

const Cinemas = () => {
    const [formInitialValues, setFormInitialValues] = useState(initialValues);
    const [formVisible, setFormVisible] = useState(false);
    const [isCreateForm, setIsCreateForm] = useState(false);
    const [page, setPage] = useLocalStorage("cinemaPage", 1);
    const { data: columns, isLoading: isSchemaLoading } = useGetColumnsFromSchema({ schemaName: "cinema" });
    const { data, isLoading: isDataLoading } = cinema.useGetCinemaQuery({ page: page - 1 });
    const [deleteCity] = cinema.useDeleteCinemaMutation();

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

    const cityIdCol = columns.findIndex((column) => column.key === "cityId");
    if (cityIdCol !== -1) {
        columns[cityIdCol] = {
            title: "City name",
            dataIndex: "cityName",
            key: "cityName",
        };
    }

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
                Add cinema
            </Button>
            <Drawer
                width={450}
                title={isCreateForm ? "Add Cinema" : "Update Cinema"}
                placement="right"
                onClose={() => setFormVisible(false)}
                visible={formVisible}
                destroyOnClose
            >
                <FormCinema
                    isCreateForm={isCreateForm}
                    initialValues={formInitialValues}
                    onSubmit={onSubmit}
                />
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

export default Cinemas;
