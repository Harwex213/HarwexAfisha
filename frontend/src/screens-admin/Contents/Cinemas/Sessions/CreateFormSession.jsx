import React, { useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { notification } from "antd";
import { Form, TimePicker, SubmitButton, InputNumber, Select } from "formik-antd";
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
    const [createSession] = session.usePostSessionMutation();

    const handleSubmit = async (values, formikBag) => {
        try {
            await createSession({
                ...values,
                time: values.date + values.time.slice(10),
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
                        <Select
                            showSearch
                            name="cinemaMovieId"
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
                    <Form.Item name="time">
                        <p>Time</p>
                        <TimePicker name="time" />
                    </Form.Item>
                    <Form.Item name="price">
                        <InputNumber name="price" suffix={<span />} />
                    </Form.Item>
                    <SubmitButton>Submit</SubmitButton>
                </Form>
            </Formik>
        </div>
    );
};

export default FormMovie;
