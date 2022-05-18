import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Input, SubmitButton } from "formik-antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useLoginMutation } from "../../../store/api/user";
import { setUser } from "../../../store/slices/userSlice";
import "./login.css";
import { setNoneRoute } from "../../../store/slices/afishaSlice";

const validationSchema = Yup.object().shape({
    username: Yup.string().min(4, "Too Short!").max(50, "Too Long!").required("Required"),
    password: Yup.string().min(4, "Too Short!").max(50, "Too Long!").required("Required"),
});

const initialValues = {
    username: "",
    password: "",
};

const Login = () => {
    const dispatch = useDispatch();
    const [login] = useLoginMutation();

    useEffect(() => {
        dispatch(setNoneRoute());
    });

    const handleSubmit = async (values, formikBag) => {
        try {
            const user = await login({ ...values }).unwrap();
            dispatch(setUser(user));
        } catch (e) {
            formikBag.setFieldError("username", e.message);
        }
    };

    return (
        <div className="login">
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                <Form>
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
                    <SubmitButton size="large" className="login__submitButton">
                        Log in
                    </SubmitButton>
                </Form>
            </Formik>
        </div>
    );
};

export default Login;
