import React, { useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { notification } from "antd";
import { Form, Input, SubmitButton, InputNumber, Select } from "formik-antd";
import { cinema } from "../../../store/api/generic";
import { useFindCityQuery } from "../../../store/api/city";

const validationSchema = Yup.object().shape({
    name: Yup.string().min(4, "Too Short!").max(50, "Too Long!").required("Required"),
    about: Yup.string().min(4, "Too Short!").max(500, "Too Long!").nullable(),
    cityId: Yup.number().required("Required"),
});

const FormMovie = ({ initialValues, onSubmit, isCreateForm }) => {
    const [city, setCity] = useState("");
    const { data: cities, isLoading } = useFindCityQuery({ city });
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
            });
        }
    };

    const handleCreate = async (values) => {
        await createCinema({ ...values }).unwrap();
    };

    const handleEdit = async (values) => {
        await updateCinema({ ...values, cityId: Number(values.cityId) }).unwrap();
    };

    return (
        <div>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {(formikBag) => (
                    <Form>
                        {isCreateForm === false ? (
                            <Form.Item style={{ display: "none" }} name="id">
                                <InputNumber name="id" placeholder="Movie id" suffix={<span />} />
                            </Form.Item>
                        ) : (
                            <></>
                        )}
                        <Form.Item name="name">
                            <Input name="name" placeholder="Cinema name" suffix={<span />} />
                        </Form.Item>
                        <Form.Item name="about">
                            <Input.TextArea name="about" placeholder="Cinema description" />
                        </Form.Item>
                        <Form.Item name="cityId">
                            <Select
                                showSearch
                                loading={isLoading}
                                name="cityName"
                                placeholder="Cinema city"
                                onSearch={(text) => setCity(text)}
                                filterOption={false}
                                onChange={(value) => formikBag.setFieldValue("cityId", value)}
                            >
                                {cities?.rows?.map((row) => (
                                    <Select.Option key={row.id} value={row.id}>
                                        {row.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <SubmitButton>Submit</SubmitButton>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default FormMovie;
