import React, { useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { notification } from "antd";
import { Form, Input, SubmitButton, InputNumber } from "formik-antd";
import { movie } from "../../../store/api/generic";
import UploadAvatar from "../../containers/UploadAvatar/UploadAvatar";
import { extractFileExt } from "../../../helpers/extractFileExt";
import { useUploadMutation } from "../../../store/api/file";

const DESCRIPTION_MAX_COUNT = 1000;

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(4, "Too Short!")
        .max(50, "Too Long!")
        .matches(/^[A-ZА-Я][a-zа-я'-`]+$/, "Must be valid name")
        .required("Required"),
    description: Yup.string().min(15, "Too Short!").max(DESCRIPTION_MAX_COUNT, "Too Long!").nullable(),
    year: Yup.number().required("Required"),
    slogan: Yup.string().nullable(),
    country: Yup.string().nullable(),
    age: Yup.string().required("Required"),
    director: Yup.string().nullable(),
    duration: Yup.number().required("Required"),
    kinopoiskId: Yup.string().nullable(),
    trailerUrl: Yup.string().nullable(),
});

const movieInitialValues = {
    name: "",
    description: null,
    year: 2022,
    slogan: null,
    country: null,
    age: 12,
    director: null,
    duration: 80,
    kinopoiskId: null,
    trailerUrl: null,
};

const FormMovie = ({ initialValues = movieInitialValues, onSubmit, isCreateForm }) => {
    const [createMovie] = movie.usePostMovieMutation();
    const [updateMovie] = movie.usePutMovieMutation();
    const [uploadPoster] = useUploadMutation();
    const [imageUrl, setImageUrl] = useState();
    const [fileList, setFileList] = useState([]);

    const handleSubmit = async (values, formikBag) => {
        try {
            if (isCreateForm) {
                await handleCreate(values);
            } else {
                await handleEdit(values);
            }

            formikBag.resetForm();
            setImageUrl(null);
            onSubmit();
        } catch (e) {
            notification["error"]({
                message: "Cannot submit",
                description: e.data?.message ?? e.message,
            });
        }
    };

    const handleCreate = async (values) => {
        if (fileList.length === 0) {
            throw new Error("You should load poster before create.");
        }

        const movie = await createMovie({ ...values }).unwrap();

        const formData = new FormData();
        formData.append(`movie/${movie.id}/poster.${extractFileExt(fileList[0].name)}`, fileList[0]);
        await uploadPoster(formData).unwrap();
    };

    const handleEdit = async (values) => {
        await updateMovie({ ...values }).unwrap();

        if (fileList.length !== 0) {
            const formData = new FormData();
            formData.append(`movie/${values.name}/poster.${extractFileExt(fileList[0].name)}`, fileList[0]);
            await uploadPoster(formData).unwrap();
        }
    };

    return (
        <div>
            <div style={{ marginBottom: "16px" }}>
                <p>Upload poster</p>
                <UploadAvatar
                    fileList={fileList}
                    setFileList={setFileList}
                    setImageUrl={setImageUrl}
                    imageUrl={imageUrl}
                />
            </div>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                <Form>
                    {isCreateForm === false ? (
                        <Form.Item style={{ display: "none" }} name="id">
                            <InputNumber name="id" placeholder="Movie id" suffix={<span />} />
                        </Form.Item>
                    ) : (
                        <></>
                    )}
                    <Form.Item name="name">
                        <p>Name</p>
                        <Input name="name" suffix={<span />} />
                    </Form.Item>
                    <Form.Item name="description">
                        <p>Description</p>
                        <Input.TextArea
                            showCount
                            maxLength={DESCRIPTION_MAX_COUNT}
                            autoSize={{ minRows: 3 }}
                            name="description"
                        />
                    </Form.Item>
                    <Form.Item name="year">
                        <p>Year</p>
                        <InputNumber name="year" min={1920} max={2022} suffix={<span />} />
                    </Form.Item>
                    <Form.Item name="slogan">
                        <p>Slogan</p>
                        <Input name="slogan" suffix={<span />} />
                    </Form.Item>
                    <Form.Item name="country">
                        <p>Countries</p>
                        <Input name="country" suffix={<span />} />
                    </Form.Item>
                    <Form.Item name="age">
                        <p>Year</p>
                        <InputNumber name="age" min={6} max={18} suffix={<span />} />
                    </Form.Item>
                    <Form.Item name="director">
                        <p>Director</p>
                        <Input name="director" suffix={<span />} />
                    </Form.Item>
                    <Form.Item name="duration">
                        <p>Duration</p>
                        <InputNumber name="duration" min={80} max={200} suffix={<span />} />
                    </Form.Item>
                    <Form.Item name="kinopoiskId">
                        <p>Kinoposk Movie id</p>
                        <Input name="kinopoiskId" suffix={<span />} />
                    </Form.Item>
                    <Form.Item name="trailerUrl">
                        <p>Trailer URL</p>
                        <Input name="trailerUrl" suffix={<span />} />
                    </Form.Item>
                    <SubmitButton>Submit</SubmitButton>
                </Form>
            </Formik>
        </div>
    );
};

export default FormMovie;
