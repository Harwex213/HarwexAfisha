import React, { useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { notification, Upload } from "antd";
import { Form, Input, SubmitButton, message } from "formik-antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
};

const validationSchema = Yup.object().shape({
    name: Yup.string().min(4, "Too Short!").max(50, "Too Long!").required("Required"),
    description: Yup.string().min(15, "Too Short!").max(500, "Too Long!"),
});

const AddMovie = ({ initialValues, handleSubmit }) => {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();

    const beforeUpload = async (file) => {
        console.log(file);
        const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
        if (!isJpgOrPng) {
            message.error("You can only upload JPG/PNG file!");
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error("Image must smaller than 2MB!");
        }
        return isJpgOrPng && isLt2M;
    };

    const handleUploadChange = (info) => {
        console.log(info);
        if (info.file.status === "uploading") {
            setLoading(true);
            return;
        }
        if (info.file.status === "done") {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (imageUrl) => {
                setLoading(false);
                setImageUrl(imageUrl);
            });
        }
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    const handleSubmitForm = async (values, formikBag) => {
        if (await handleSubmit(values)) {
            formikBag.resetForm();
            notification["success"]({
                message: "Successfully created.",
            });
        }
    };

    return (
        <div>
            <Upload
                name="avatar"
                listType="picture-card"
                showUploadList={false}
                action="http://localhost:5000/file/upload"
                withCredentials={true}
                beforeUpload={beforeUpload}
                onChange={handleUploadChange}
            >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: "100%" }} /> : uploadButton}
            </Upload>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmitForm}
            >
                <Form>
                    <Form.Item name="name">
                        <Input name="name" placeholder="Movie name" suffix={<span />} />
                    </Form.Item>
                    <Form.Item name="description">
                        <Input.TextArea name="description" placeholder="Movie description" />
                    </Form.Item>
                    <SubmitButton>Create</SubmitButton>
                </Form>
            </Formik>
        </div>
    );
};

export default AddMovie;
