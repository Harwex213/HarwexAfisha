import React, { useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { notification } from "antd";
import { Form, Input, SubmitButton, InputNumber } from "formik-antd";
import { movie } from "../../../store/api/generic";
import UploadAvatar from "../../containers/UploadAvatar/UploadAvatar";
import { extractFileExt } from "../../../helpers/extractFileExt";
import { useUploadMutation } from "../../../store/api/file";

const validationSchema = Yup.object().shape({
    name: Yup.string().min(4, "Too Short!").max(50, "Too Long!").required("Required"),
    description: Yup.string().min(15, "Too Short!").max(500, "Too Long!").nullable(),
});

const movieInitialValues = {
    name: "",
    description: "",
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
            formData.append(`movie/${values.id}/poster.${extractFileExt(fileList[0].name)}`, fileList[0]);
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
                        <Input name="name" placeholder="Movie name" suffix={<span />} />
                    </Form.Item>
                    <Form.Item name="description">
                        <Input.TextArea name="description" placeholder="Movie description" />
                    </Form.Item>
                    <SubmitButton>Submit</SubmitButton>
                </Form>
            </Formik>
        </div>
    );
};

export default FormMovie;
