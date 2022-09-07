import React, { useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { notification } from "antd";
import { Form, DatePicker, SubmitButton, InputNumber, Select } from "formik-antd";
import { session } from "../../../../store/api/generic";
import { useFindMoviesByCinemaDateQuery } from "../../../../store/api/cinemaMovie";

const validationSchema = Yup.object().shape({
    cinemaMovieId: Yup.number().required("Required"),
    time: Yup.mixed().required("Required"),
    price: Yup.number().positive().required("Required"),
});

const FormMovie = ({ initialValues, onSubmit }) => {
    const [movieName, setMovieName] = useState("");
    const { data: movies } = useFindMoviesByCinemaDateQuery({
        cinemaId: initialValues.cinemaId,
        date: initialValues.date,
        movieName,
    });
    const [updateSession] = session.usePutSessionMutation();

    const handleSubmit = async (values, formikBag) => {
        try {
            await updateSession({
                ...values,
                time: values.time,
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
                    <Form.Item name="cinemaMovieId">
                        <p>Select movie</p>
                        <Select
                            showSearch
                            name="cinemaMovieId"
                            placeholder="Movie"
                            onSearch={(text) => setMovieName(text)}
                            filterOption={false}
                        >
                            {movies?.map((row) => (
                                <Select.Option key={row.id} value={row.id}>
                                    {row.movieName}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name="time">
                        <p>Time</p>
                        <DatePicker showTime name="time" />
                    </Form.Item>
                    <Form.Item name="price">
                        <p>Price</p>
                        <InputNumber name="price" suffix={<span />} />
                    </Form.Item>
                    <SubmitButton>Submit</SubmitButton>
                </Form>
            </Formik>
        </div>
    );
};

export default FormMovie;
