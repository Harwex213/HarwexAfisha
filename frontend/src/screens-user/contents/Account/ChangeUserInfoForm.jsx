import React from "react";
import { Form, Input, SubmitButton } from "formik-antd";
import { UserOutlined } from "@ant-design/icons";
import { Formik } from "formik";
import * as Yup from "yup";
import validationMessages from "../../../constants/validationMessages";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUserChange } from "../../../store/slices/userSlice";
import { useChangeInfoMutation } from "../../../store/api/user";

const { msgTooShort, msgTooLong, msgRequired } = validationMessages;

const validationSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, msgTooShort)
        .max(50, msgTooLong)
        .matches(/^[A-ZА-Я][a-zа-я'\-`]+$/, "Must be valid firstname")
        .required(msgRequired),
    lastName: Yup.string()
        .min(2, msgTooShort)
        .max(50, msgTooLong)
        .matches(/^[A-ZА-Я][a-zа-я'\-`]+$/, "Must be valid lastname")
        .required(msgRequired),
    patronymic: Yup.string()
        .min(2, msgTooShort)
        .max(50, msgTooLong)
        .matches(/^[A-ZА-Я][a-zа-я'\-`]+$/, "Must be valid patronymic")
        .nullable(),
    email: Yup.string().email().max(256, msgTooLong).nullable(),
    username: Yup.string().min(4, msgTooShort).max(50, msgTooLong).required(msgRequired),
});

const ChangeUserInfoForm = ({ onSubmit }) => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const [changeInfo] = useChangeInfoMutation();

    const initialValues = {
        firstName: user.firstName,
        lastName: user.lastName,
        patronymic: user.patronymic,
        username: user.username,
        email: user.email,
    };

    const handleSubmit = async (values, formikBag) => {
        if (JSON.stringify(initialValues) === JSON.stringify(values)) {
            return;
        }

        try {
            await changeInfo({ ...values }).unwrap();
            dispatch(setUserChange({ ...values }));

            onSubmit();
        } catch (e) {
            formikBag.setFieldError("username", e.data?.message ?? e.message);
        }
    };

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            <Form>
                <Form.Item name="firstName">
                    <Input name="firstName" placeholder="FirstName" />
                </Form.Item>
                <Form.Item name="lastName">
                    <Input name="lastName" placeholder="LastName" />
                </Form.Item>
                <Form.Item name="patronymic">
                    <Input name="patronymic" placeholder="Patronymic" />
                </Form.Item>
                <Form.Item name="email">
                    <Input name="email" placeholder="Email" />
                </Form.Item>
                <Form.Item name="username">
                    <Input
                        name="username"
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="Username"
                    />
                </Form.Item>
                <SubmitButton>Change</SubmitButton>
            </Form>
        </Formik>
    );
};

export default ChangeUserInfoForm;
