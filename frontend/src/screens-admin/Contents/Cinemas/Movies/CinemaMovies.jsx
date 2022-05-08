import React, { useState } from "react";
import { BackTop, Button, Divider, Drawer, notification, Space, Table } from "antd";
import useLocalStorage from "../../../../hooks/useLocalStorageState";
import { cinemaMovie } from "../../../../store/api/generic";
import { useGetMoviesByCinemaQuery } from "../../../../store/api/cinemaMovie";
import CreateFormCinemaMovie from "./CreateFormCinemaMovie";
import UpdateFormCinemaMovie from "./UpdateFormCinemaMovie";
import moment from "moment";

const initialValues = {
    movieId: "",
    date: "",
};

const columns = [
    { title: "Id", dataIndex: "id", key: "id" },
    { title: "Movie", dataIndex: "movieName", key: "movieName" },
    { title: "Start Date", dataIndex: "start", key: "start" },
    { title: "Finish Date", dataIndex: "finish", key: "finish" },
    { title: "Actions", key: "actions" },
];

const ACTIONS_INDEX = 4;

const CinemaMovies = ({ cinema }) => {
    const [formInitialValues, setFormInitialValues] = useState({ ...initialValues, cinemaId: cinema.id });
    const [createFormVisible, setCreateFormVisible] = useState(false);
    const [updateFormVisible, setUpdateFormVisible] = useState(false);
    const [page, setPage] = useLocalStorage("cinemaMoviesPage", 1);
    const { data, isLoading: isDataLoading } = useGetMoviesByCinemaQuery({
        page: page - 1,
        cinemaId: cinema.id,
    });
    const [deleteCinemaMovie] = cinemaMovie.useDeleteCinemaMovieMutation();

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
        setFormInitialValues({ ...initialValues, cinemaId: cinema.id });
        setCreateFormVisible(true);
    };
    const handleEdit = (event, record) => {
        event.preventDefault();

        setFormInitialValues({
            ...record,
            cinemaId: cinema.id,
            date: [moment(record.start), moment(record.finish)],
        });
        setUpdateFormVisible(true);
    };
    const handleDelete = async (event, id) => {
        event.preventDefault();

        try {
            await deleteCinemaMovie({ id }).unwrap();

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

    columns[ACTIONS_INDEX].render = (text, record) => (
        <Space size="middle">
            <a onClick={(event) => handleEdit(event, record)}>Edit</a>
            <a onClick={(event) => handleDelete(event, record.id)}>Delete</a>
        </Space>
    );

    return (
        <div>
            <BackTop />
            <div>
                <h4>Actions</h4>
                <Button type="primary" onClick={handleCreate}>
                    Add movie
                </Button>
                <Divider />
            </div>
            <Drawer
                width={450}
                title="Add movie to cinema"
                placement="right"
                onClose={() => setCreateFormVisible(false)}
                visible={createFormVisible}
                destroyOnClose
            >
                <CreateFormCinemaMovie initialValues={formInitialValues} onSubmit={onCreateSubmit} />
            </Drawer>
            <Drawer
                width={450}
                title="Edit cinema's movie"
                placement="right"
                onClose={() => setUpdateFormVisible(false)}
                visible={updateFormVisible}
                destroyOnClose
            >
                <UpdateFormCinemaMovie initialValues={formInitialValues} onSubmit={onUpdateSubmit} />
            </Drawer>
            {isDataLoading ? (
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

export default CinemaMovies;
