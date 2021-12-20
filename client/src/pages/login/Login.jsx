import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Button, Link, Stack, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { useLogin } from "../../api/hooks/useAuth";
import { routePaths } from "../../common/constants/routePaths";

const loginValidation = yup.object().shape({
    username: yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
    password: yup.string().min(4, "Too Short!").max(50, "Too Long!").required("Required"),
});

const initialValues = {
    username: "",
    password: "",
};

const Login = () => {
    const loginMutation = useLogin();

    const handleSubmit = async (values) => {
        await loginMutation.mutate(values);
    };

    return (
        <Stack sx={{ pt: 15, alignItems: "center" }}>
            <Formik initialValues={initialValues} validationSchema={loginValidation} onSubmit={handleSubmit}>
                {({ values, handleChange, errors, touched }) => (
                    <Form>
                        <Stack spacing={3}>
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
                                    to={routePaths.register}
                                >
                                    Registration?
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

export default Login;
