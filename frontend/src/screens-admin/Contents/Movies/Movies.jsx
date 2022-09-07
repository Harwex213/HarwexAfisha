import React, { useState } from "react";
import { BackTop, Button, Divider, Drawer, notification, Space, Table, Typography } from "antd";
import useLocalStorage from "../../../hooks/useLocalStorageState";
import useGetColumnsFromSchema from "../../../hooks/useGetColumnsFromSchema";
import { movie } from "../../../store/api/generic";
import { imageFallback } from "../../../constants/imageFallback";
import FormMovie from "./FormMovie";
import MoviePoster from "../../../components/MoviePoster";

const specialRender = {
    description: (text, record) => (
        <Typography.Paragraph ellipsis={{ rows: 2, expandable: false }}>
            {record.description}
        </Typography.Paragraph>
    ),
    slogan: (text, record) => (
        <Typography.Paragraph ellipsis={{ rows: 3, expandable: false }}>{record.slogan}</Typography.Paragraph>
    ),
    trailerUrl: (text, record) => (
        <a href={record.trailerUrl} target="_blank" rel="noreferrer">
            Trailer
        </a>
    ),
};

const Movies = () => {
    const [formInitialValues, setFormInitialValues] = useState(undefined);
    const [formVisible, setFormVisible] = useState(false);
    const [isCreateForm, setIsCreateForm] = useState(false);
    const [page, setPage] = useLocalStorage("moviesPage", 1);
    const [time, setTime] = useState(new Date());
    let { data: columns, isLoading: isSchemaLoading } = useGetColumnsFromSchema({
        schemaName: "movie",
        specialRender,
    });
    let { data: movies, isLoading: isMoviesLoading } = movie.useGetMovieQuery({ page: page - 1 });
    const [deleteMovie] = movie.useDeleteMovieMutation();

    const onSubmit = () => {
        setFormVisible(false);
        setTime(new Date());
        notification["success"]({
            message: "Success.",
        });
    };

    const handleCreate = () => {
        setFormInitialValues(undefined);
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
            await deleteMovie({ id }).unwrap();

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
        title: "View Poster",
        key: "poster",
        render: (text, record) => (
            <MoviePoster
                className="afisha__movieImg"
                name={record.name}
                style={{ objectFit: "cover" }}
                width={75}
                height={75}
                fallback={imageFallback}
                time={time.getTime()}
            />
        ),
    });

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
                    Add movie
                </Button>
            </div>
            <Divider />
            <Drawer
                width={700}
                title={isCreateForm ? "Add Movie" : "Update Movie"}
                placement="right"
                onClose={() => setFormVisible(false)}
                visible={formVisible}
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
