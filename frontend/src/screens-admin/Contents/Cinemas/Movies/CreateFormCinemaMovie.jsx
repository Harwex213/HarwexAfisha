import React, { useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { notification } from "antd";
import { Form, DatePicker, SubmitButton, InputNumber, Select } from "formik-antd";
import { cinemaMovie } from "../../../../store/api/generic";
import moment from "moment";
import { useFindExceptMoviesByCinemaQuery } from "../../../../store/api/cinemaMovie";

const validationSchema = Yup.object().shape({
    movieId: Yup.number().required("Required"),
    cinemaId: Yup.number().required("Required"),
    date: Yup.mixed().required("Required"),
});

const disabledDate = (current) => {
    return current && current < moment().endOf("day");
};

const FormMovie = ({ initialValues, onSubmit }) => {
    const [movieName, setMovieName] = useState("");
    const { data: movies } = useFindExceptMoviesByCinemaQuery({
        cinemaId: initialValues.cinemaId,
        movieName,
    });
    const [createCinemaMovie] = cinemaMovie.usePostCinemaMovieMutation();

    const handleSubmit = async (values, formikBag) => {
        try {
            const start = values.date[0].format("YYYY-MM-DD");
            const finish = values.date[1].format("YYYY-MM-DD");
            await createCinemaMovie({
                cinemaId: values.cinemaId,
                movieId: values.movieId,
                start,
                finish,
            }).unwrap();

            formikBag.resetForm();
            onSubmit();
        } catch (e) {
            notification["error"]({
                message: "Cannot submit",
                description: e.data?.message ?? e.message,
                placement: "topLeft",
            });
        }
    };

    return (
        <div>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                <Form>
                    <Form.Item style={{ display: "none" }} name="cinemaId">
                        <InputNumber name="cinemaId" suffix={<span />} />
                    </Form.Item>
                    <Form.Item name="movieId">
                        <Select
                            showSearch
                            name="movieId"
                            placeholder="Movie"
                            onSearch={(text) => setMovieName(text)}
                            filterOption={false}
                        >
                            {movies?.map((row) => (
                                <Select.Option key={row.id} value={row.id}>
                                    {row.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name="date">
                        <p>Showing date</p>
                        <DatePicker.RangePicker name="date" disabledDate={disabledDate} />
                    </Form.Item>
                    <SubmitButton>Submit</SubmitButton>
                </Form>
            </Formik>
        </div>
    );
};

export default FormMovie;
