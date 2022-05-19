import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Input, SubmitButton } from "formik-antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useRegisterMutation } from "../../../store/api/user";
import { setUser } from "../../../store/slices/userSlice";
import "./register.css";
import { setNoneRoute } from "../../../store/slices/afishaSlice";
import validationMessages from "../../../constants/validationMessages";

const { msgTooShort, msgTooLong, msgRequired, msgPasswordsMatch, msgRepeatPassword } = validationMessages;

const validationSchema = Yup.object().shape({
    firstName: Yup.string().min(2, msgTooShort).max(50, msgTooLong).required(msgRequired),
    lastName: Yup.string().min(2, msgTooShort).max(50, msgTooLong).required(msgRequired),
    patronymic: Yup.string().min(2, msgTooShort).max(50, msgTooLong),
    username: Yup.string().min(4, msgTooShort).max(50, msgTooLong).required(msgRequired),
    password: Yup.string().min(4, msgTooShort).max(50, msgTooLong).required(msgRequired),
    repeatPassword: Yup.string()
        .oneOf([Yup.ref("password")], msgPasswordsMatch)
        .required(msgRepeatPassword),
});

const initialValues = {
    firstName: "",
    lastName: "",
    patronymic: "",
    username: "",
    password: "",
    repeatPassword: "",
};

const Register = () => {
    const dispatch = useDispatch();
    const [register] = useRegisterMutation();

    useEffect(() => {
        dispatch(setNoneRoute());
    });

    const handleSubmit = async (values, formikBag) => {
        try {
            const user = await register({ ...values }).unwrap();
            dispatch(setUser(user));
        } catch (e) {
            formikBag.setFieldError("username", e.message);
        }
    };

    return (
        <div className="register">
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                <Form>
                    <Form.Item name="firstName">
                        <Input size="large" name="firstName" placeholder="Имя" />
                    </Form.Item>
                    <Form.Item name="lastName">
                        <Input size="large" name="lastName" placeholder="Фамилия" />
                    </Form.Item>
                    <Form.Item name="patronymic">
                        <Input size="large" name="patronymic" placeholder="Отчество" />
                    </Form.Item>
                    <Form.Item name="username">
                        <Input
                            size="large"
                            name="username"
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder="Username"
                        />
                    </Form.Item>
                    <Form.Item name="password">
                        <Input.Password
                            size="large"
                            name="password"
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            placeholder="Пароль"
                        />
                    </Form.Item>
                    <Form.Item name="repeatPassword">
                        <Input.Password
                            size="large"
                            name="repeatPassword"
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            placeholder="Повторите пароль"
                        />
                    </Form.Item>
                    <SubmitButton size="large" className="register__submitButton">
                        Зарегистрироваться
                    </SubmitButton>
                </Form>
            </Formik>
        </div>
    );
};

export default Register;
