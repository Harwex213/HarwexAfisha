import React from "react";
import { Box, Button, Link, Stack, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import { Link as RouterLink } from "react-router-dom";
import { routePaths } from "../../common/constants/routePaths";
import * as yup from "yup";

const registerValidation = yup.object().shape({
    firstName: yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
    lastName: yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
    patronymic: yup.string().min(2, "Too Short!").max(50, "Too Long!"),
    username: yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
    password: yup.string().min(4, "Too Short!").max(50, "Too Long!").required("Required"),
    repeatPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords must match")
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
    const handleSubmit = (values) => {
        alert(JSON.stringify(values));
    };

    return (
        <Stack sx={{ pt: 10, alignItems: "center" }}>
            <Formik
                initialValues={initialValues}
                validationSchema={registerValidation}
                onSubmit={handleSubmit}
            >
                {({ values, handleChange, errors, touched }) => (
                    <Form>
                        <Stack spacing={3}>
                            <TextField
                                autoComplete="off"
                                name="firstName"
                                label="First name"
                                value={values.firstName}
                                onChange={handleChange}
                                error={touched.firstName && Boolean(errors.firstName)}
                                helperText={touched.firstName && errors.firstName}
                            />
                            <TextField
                                autoComplete="off"
                                name="lastName"
                                label="Last name"
                                value={values.v}
                                onChange={handleChange}
                                error={touched.lastName && Boolean(errors.lastName)}
                                helperText={touched.lastName && errors.lastName}
                            />
                            <TextField
                                autoComplete="off"
                                name="patronymic"
                                label="Patronymic"
                                value={values.patronymic}
                                onChange={handleChange}
                                error={touched.patronymic && Boolean(errors.patronymic)}
                                helperText={touched.patronymic && errors.patronymic}
                            />
                            <TextField
                                autoComplete="off"
                                name="username"
                                label="Username"
                                value={values.username}
                                onChange={handleChange}
                                error={touched.username && Boolean(errors.username)}
                                helperText={touched.username && errors.username}
                            />
                            <TextField
                                type="password"
                                autoComplete="off"
                                name="password"
                                label="Password"
                                value={values.password}
                                onChange={handleChange}
                                error={touched.password && Boolean(errors.password)}
                                helperText={touched.password && errors.password}
                            />
                            <Box sx={{ display: "flex" }}>
                                <Box sx={{ flexGrow: 1 }} />
                                <Button sx={{ mr: 2 }} type="submit" variant="contained">
                                    Login
                                </Button>
                                <Link
                                    sx={{ m: "auto" }}
                                    typography="body1"
                                    underline="none"
                                    component={RouterLink}
                                    to={routePaths.login}
                                >
                                    Login?
                                </Link>
                                <Box sx={{ flexGrow: 1 }} />
                            </Box>
                        </Stack>
                    </Form>
                )}
            </Formik>
        </Stack>
    );
};

export default Register;
