import React, { useState } from "react";
import { Button, Drawer, notification, Table } from "antd";
import AddMovie from "./AddMovie/AddMovie";
import useLocalStorage from "../../../hooks/useLocalStorageState";
import useGetColumnsFromSchema from "../../../hooks/useGetColumnsFromSchema";
import { movie } from "../../../store/api/generic";

const Movies = () => {
    const [addMovieVisible, setAddMovieVisible] = useState(false);
    const [page, setPage] = useLocalStorage("moviesPage", 1);
    const { data: columns, isLoading: isSchemaLoading } = useGetColumnsFromSchema({ schemaName: "movie" });
    const { data: movies, isLoading: isMoviesLoading } = movie.useGetMovieQuery({ page: page - 1 });
    const [createMovie] = movie.usePostMovieMutation();

    const handleAddMovie = async (values) => {
        try {
            await createMovie({ ...values }).unwrap();

            setAddMovieVisible(false);
            return true;
        } catch (e) {
            notification["error"]({
                message: "Cannot create",
                description: e.data.message,
            });
            return false;
        }
    };

    return (
        <div>
            <Button type="primary" onClick={() => setAddMovieVisible(true)}>
                Add movie
            </Button>
            <Drawer
                title="Add Movie"
                placement="right"
                onClose={() => setAddMovieVisible(false)}
                visible={addMovieVisible}
            >
                <AddMovie
                    initialValues={{
                        name: "",
                        description: "",
                    }}
                    handleSubmit={handleAddMovie}
                />
            </Drawer>
            {isSchemaLoading || isMoviesLoading ? (
                <div>Loading...</div>
            ) : (
                <Table
                    columns={columns}
                    dataSource={movies.rows}
                    rowKey="id"
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
