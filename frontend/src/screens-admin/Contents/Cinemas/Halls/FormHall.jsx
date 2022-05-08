import React from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { notification } from "antd";
import { Form, Input, SubmitButton, InputNumber } from "formik-antd";
import { hall } from "../../../../store/api/generic";

const validationSchema = Yup.object().shape({
    name: Yup.string().min(4, "Too Short!").max(50, "Too Long!").required("Required"),
    rows: Yup.number().moreThan(0).required("Required"),
    cols: Yup.number().moreThan(2).required("Required"),
    cinemaId: Yup.number().required("Required"),
});

const FormMovie = ({ initialValues, onSubmit, isCreateForm }) => {
    const [createHall] = hall.usePostHallMutation();
    const [updateHall] = hall.usePutHallMutation();

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
        await createHall({ ...values, cinemaId: Number(values.cinemaId) }).unwrap();
    };

    const handleEdit = async (values) => {
        await updateHall({ ...values, cinemaId: Number(values.cinemaId) }).unwrap();
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
                    <Form.Item style={{ display: "none" }} name="cinemaId">
                        <InputNumber name="cinemaId" suffix={<span />} />
                    </Form.Item>
                    <Form.Item name="name">
                        <Input name="name" placeholder="Hall name" suffix={<span />} />
                    </Form.Item>
                    <Form.Item name="rows">
                        <InputNumber name="rows" min={1} placeholder="Hall rows" suffix={<span />} />
                    </Form.Item>
                    <Form.Item name="cols">
                        <InputNumber name="cols" min={3} placeholder="Hall cols" suffix={<span />} />
                    </Form.Item>
                    <SubmitButton>Submit</SubmitButton>
                </Form>
            </Formik>
        </div>
    );
};

export default FormMovie;
