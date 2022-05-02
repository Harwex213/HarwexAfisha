import React from "react";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import { Form, Input, SubmitButton } from "formik-antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import * as Yup from "yup";
import { useLoginMutation } from "../../../store/api/user";
import { setUser } from "../../../store/slices/userSlice";

const validationSchema = Yup.object().shape({
    username: Yup.string().min(4, "Too Short!").max(50, "Too Long!").required("Required"),
    password: Yup.string().min(4, "Too Short!").max(50, "Too Long!").required("Required"),
});

const Login = () => {
    const dispatch = useDispatch();
    const [login] = useLoginMutation();

    const handleSubmit = async (values, formikBag) => {
        try {
            const user = await login({ ...values }).unwrap();
            dispatch(setUser(user));
        } catch (e) {
            formikBag.setFieldError("username", e.message);
        }
    };

    return (
        <div>
            <Formik
                initialValues={{
                    username: "",
                    password: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form>
                    <Form.Item name="username">
                        <Input
                            name="username"
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder="Username"
                        />
                    </Form.Item>
                    <Form.Item name="password">
                        <Input.Password
                            name="password"
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            placeholder="Password"
                        />
                    </Form.Item>
                    <SubmitButton>Log in</SubmitButton>
                </Form>
            </Formik>
        </div>
    );
};

export default Login;
