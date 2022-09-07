import React from "react";
import { Formik } from "formik";
import { Form, Input, SubmitButton } from "formik-antd";
import { LockOutlined } from "@ant-design/icons";
import * as Yup from "yup";
import { Divider, notification } from "antd";
import validationMessages from "../../../constants/validationMessages";
import { useChangePasswordMutation } from "../../../store/api/user";
import { setUser } from "../../../store/slices/userSlice";
import { useDispatch } from "react-redux";

const { msgTooShort, msgTooLong, msgRequired, msgPasswordsMatch, msgRepeatPassword } = validationMessages;

const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().min(4, msgTooShort).max(50, msgTooLong).required(msgRequired),
    password: Yup.string().min(4, msgTooShort).max(50, msgTooLong).required(msgRequired),
    repeatPassword: Yup.string()
        .oneOf([Yup.ref("password")], msgPasswordsMatch)
        .required(msgRepeatPassword),
});

const initialValues = {
    oldPassword: "",
    password: "",
    repeatPassword: "",
};

const ChangePasswordForm = () => {
    const [changePassword] = useChangePasswordMutation();

    const handleSubmit = async (values, formikBag) => {
        try {
            await changePassword({ ...values }).unwrap();

            notification["success"]({
                message: "Successfully changed",
                placement: "topLeft",
            });
        } catch (e) {
            formikBag.setFieldError("oldPassword", e.data?.message ?? e.message);
        }
    };

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {(formik) => (
                <Form>
                    <Divider />
                    <Form.Item name="oldPassword">
                        <Input.Password
                            name="oldPassword"
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            placeholder="Old password"
                        />
                    </Form.Item>
                    <Form.Item name="password">
                        <Input.Password
                            name="password"
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            placeholder="New password"
                        />
                    </Form.Item>
                    <Form.Item name="repeatPassword">
                        <Input.Password
                            name="repeatPassword"
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            placeholder="Password repeat"
                        />
                    </Form.Item>
                    <Divider style={{ marginTop: "15px" }} />
                    <SubmitButton type="default" className="login__submitButton">
                        Change password
                    </SubmitButton>
                </Form>
            )}
        </Formik>
    );
};

export default ChangePasswordForm;
