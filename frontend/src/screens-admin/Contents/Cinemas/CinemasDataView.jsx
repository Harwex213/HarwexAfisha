import React, { useEffect, useState } from "react";
import useLocalStorage from "../../../hooks/useLocalStorageState";
import useGetColumnsFromSchema from "../../../hooks/useGetColumnsFromSchema";
import { cinema } from "../../../store/api/generic";
import { BackTop, Button, Divider, Drawer, notification, Space, Table } from "antd";
import FormCinema from "./FormCinema";

const initialValues = {
    name: "",
    about: "",
};

const CinemasDataView = ({ city }) => {
    const [formInitialValues, setFormInitialValues] = useState({ ...initialValues, cityId: city.id });
    const [formVisible, setFormVisible] = useState(false);
    const [isCreateForm, setIsCreateForm] = useState(false);
    const [page, setPage] = useLocalStorage("cinemaPage", 1);
    const { data: columns, isLoading: isSchemaLoading } = useGetColumnsFromSchema({
        schemaName: "cinema",
        toExclude: ["cityId"],
    });
    const { data, isLoading: isDataLoading } = cinema.useGetCinemaQuery({
        page: page - 1,
        where: {
            cityId: city.id,
        },
    });
    const [deleteCity] = cinema.useDeleteCinemaMutation();

    useEffect(() => {
        if (data && data.count < page * 15) {
            setPage(parseInt(String(data.count / 15)) + 1);
        }
    });

    const onSubmit = () => {
        setFormVisible(false);

        notification["success"]({
            message: "Success.",
            placement: "topLeft",
        });
    };

    const handleCreate = () => {
        setFormInitialValues({ ...initialValues, cityId: city.id });
        setFormVisible(true);
        setIsCreateForm(true);
    };
    const handleEdit = (event, record) => {
        setFormInitialValues({ ...record });
        setFormVisible(true);
        setIsCreateForm(false);
    };
    const handleDelete = async (event, id) => {
        try {
            await deleteCity({ id }).unwrap();

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
                <Button type="default" onClick={(event) => handleEdit(event, record)}>
                    Edit
                </Button>
                <Button type="default" danger onClick={(event) => handleDelete(event, record.id)}>
                    Delete
                </Button>
            </Space>
        ),
    });

    return (
        <div>
            <BackTop />
            <div>
                <h4>Actions</h4>
                <Button type="primary" onClick={handleCreate}>
                    Add cinema
                </Button>
            </div>
            <Divider />
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

export default CinemasDataView;
