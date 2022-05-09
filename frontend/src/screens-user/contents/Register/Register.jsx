import React from "react";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Input, SubmitButton } from "formik-antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useRegisterMutation } from "../../../store/api/user";
import { setUser } from "../../../store/slices/userSlice";
import "./register.css";

const validationSchema = Yup.object().shape({
    firstName: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
    lastName: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
    patronymic: Yup.string().min(2, "Too Short!").max(50, "Too Long!"),
    username: Yup.string().min(4, "Too Short!").max(50, "Too Long!").required("Required"),
    password: Yup.string().min(4, "Too Short!").max(50, "Too Long!").required("Required"),
    repeatPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Please, repeat your password"),
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
                        <Input size="large" name="firstName" placeholder="Firstname" />
                    </Form.Item>
                    <Form.Item name="lastName">
                        <Input size="large" name="lastName" placeholder="Lastname" />
                    </Form.Item>
                    <Form.Item name="patronymic">
                        <Input size="large" name="patronymic" placeholder="Patronymic" />
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
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item name="repeatPassword">
                        <Input.Password
                            size="large"
                            name="repeatPassword"
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            placeholder="Repeat password"
                        />
                    </Form.Item>
                    <SubmitButton size="large" className="register__submitButton">
                        Register
                    </SubmitButton>
                </Form>
            </Formik>
        </div>
    );
};

export default Register;
