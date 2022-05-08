import React from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { notification } from "antd";
import { Form, Input, SubmitButton, InputNumber } from "formik-antd";
import { cinema } from "../../../store/api/generic";

const validationSchema = Yup.object().shape({
    name: Yup.string().min(4, "Too Short!").max(50, "Too Long!").required("Required"),
    about: Yup.string().min(4, "Too Short!").max(500, "Too Long!").nullable(),
    cityId: Yup.number().required("Required"),
});

const FormMovie = ({ initialValues, onSubmit, isCreateForm }) => {
    const [createCinema] = cinema.usePostCinemaMutation();
    const [updateCinema] = cinema.usePutCinemaMutation();

    const handleSubmit = async (values, formikBag) => {
        try {
            if (isCreateForm) {
                await handleCreate(values);
            } else {
                await handleEdit(values);
            }

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

    const handleCreate = async (values) => {
        await createCinema({ ...values, cityId: Number(values.cityId) }).unwrap();
    };

    const handleEdit = async (values) => {
        await updateCinema({ ...values, cityId: Number(values.cityId) }).unwrap();
    };

    return (
        <div>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                <Form>
                    {isCreateForm === false ? (
                        <Form.Item style={{ display: "none" }} name="id">
                            <InputNumber name="id" suffix={<span />} />
                        </Form.Item>
                    ) : (
                        <></>
                    )}
                    <Form.Item style={{ display: "none" }} name="cityId">
                        <InputNumber name="cityId" suffix={<span />} />
                    </Form.Item>
                    <Form.Item name="name">
                        <Input name="name" placeholder="Cinema name" suffix={<span />} />
                    </Form.Item>
                    <Form.Item name="about">
                        <Input.TextArea name="about" placeholder="Cinema description" />
                    </Form.Item>
                    <SubmitButton>Submit</SubmitButton>
                </Form>
            </Formik>
        </div>
    );
};

export default FormMovie;
