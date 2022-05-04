import React, { useState } from "react";
import { BackTop, Button, Drawer, Image, notification, Space, Table } from "antd";
import useLocalStorage from "../../../hooks/useLocalStorageState";
import useGetColumnsFromSchema from "../../../hooks/useGetColumnsFromSchema";
import { movie } from "../../../store/api/generic";
import apiConfig from "../../../constants/apiConfig";
import { imageFallback } from "../../../constants/imageFallback";
import FormMovie from "./UpdateMovie/FormMovie";

const movieInitialValues = {
    name: "",
    description: "",
};

const Movies = () => {
    const [formInitialValues, setFormInitialValues] = useState(movieInitialValues);
    const [addMovieVisible, setAddMovieVisible] = useState(false);
    const [isCreateForm, setIsCreateForm] = useState(false);
    const [page, setPage] = useLocalStorage("moviesPage", 1);
    const [time, setTime] = useState(new Date());
    let { data: columns, isLoading: isSchemaLoading } = useGetColumnsFromSchema({ schemaName: "movie" });
    let { data: movies, isLoading: isMoviesLoading } = movie.useGetMovieQuery({ page: page - 1 });
    const [deleteMovie] = movie.useDeleteMovieMutation();

    const onSubmit = () => {
        setAddMovieVisible(false);
        setTime(new Date());
        notification["success"]({
            message: "Success.",
        });
    };

    const handleCreate = () => {
        setFormInitialValues({
            name: "",
            description: "",
        });
        setAddMovieVisible(true);
        setIsCreateForm(true);
    };
    const handleEdit = (event, record) => {
        event.preventDefault();
        setFormInitialValues({ ...record });
        setAddMovieVisible(true);
        setIsCreateForm(false);
    };
    const handleDelete = async (event, id) => {
        event.preventDefault();

        try {
            await deleteMovie({ id: Number(id) }).unwrap();

            notification["success"]({
                message: "Success.",
            });
        } catch (e) {
            notification["success"]({
                message: "Success.",
            });
        }
    };

    columns.push({
        title: "View Poster",
        key: "poster",
        render: (text, record) => (
            <Image
                width={100}
                height={150}
                style={{
                    objectFit: "cover",
                }}
                src={`${apiConfig.baseUrl}static/movie/${record.id}/poster.jpg?${time.getTime()}`}
                fallback={imageFallback}
            />
        ),
    });

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
                Add movie
            </Button>
            <Drawer
                width={450}
                title={isCreateForm ? "Add Movie" : "Update Movie"}
                placement="right"
                onClose={() => setAddMovieVisible(false)}
                visible={addMovieVisible}
                destroyOnClose
            >
                <FormMovie
                    isCreateForm={isCreateForm}
                    initialValues={formInitialValues}
                    onSubmit={onSubmit}
                />
            </Drawer>
            {isSchemaLoading || isMoviesLoading ? (
                <div>Loading...</div>
            ) : (
                <Table
                    columns={columns}
                    dataSource={movies.rows}
                    rowKey="id"
                    bordered
                    pagination={{
                        current: page,
                        onChange: (page) => setPage(page),
                        pageSize: 15,
                        showSizeChanger: false,
                        total: movies.count,
                        position: ["topLeft", "bottomLeft"],
                    }}
                />
            )}
        </div>
    );
};

export default Movies;
