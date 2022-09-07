import React from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { notification } from "antd";
import { Form, DatePicker, SubmitButton, InputNumber } from "formik-antd";
import { cinemaMovie } from "../../../../store/api/generic";
import moment from "moment";

const validationSchema = Yup.object().shape({
    movieId: Yup.number().required("Required"),
    cinemaId: Yup.number().required("Required"),
    date: Yup.mixed().required("Required"),
});

const disabledDate = (current) => {
    return current && current < moment().endOf("day");
};

const FormMovie = ({ initialValues, onSubmit }) => {
    const [updateCinemaMovie] = cinemaMovie.usePutCinemaMovieMutation();

    const handleSubmit = async (values, formikBag) => {
        try {
            const start = values.date[0].format("YYYY-MM-DD");
            const finish = values.date[1].format("YYYY-MM-DD");
            await updateCinemaMovie({
                id: values.id,
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
                    <Form.Item style={{ display: "none" }} name="id">
                        <InputNumber name="id" suffix={<span />} />
                    </Form.Item>
                    <Form.Item style={{ display: "none" }} name="cinemaId">
                        <InputNumber name="cinemaId" suffix={<span />} />
                    </Form.Item>
                    <Form.Item style={{ display: "none" }} name="movieId">
                        <InputNumber name="movieId" suffix={<span />} />
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
