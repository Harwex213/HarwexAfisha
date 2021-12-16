import React from "react";
import PropTypes from "prop-types";
import { Box, Button, IconButton, Modal, Stack, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { modalStyle } from "../../../common/styles/material";

const cityValidation = yup.object().shape({
    name: yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
});

const CityModal = ({ header, initialValues, handleSubmit, isOpen, handleClose }) => {
    return (
        <Modal open={isOpen} onClose={handleClose}>
            <Box sx={modalStyle}>
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <Typography variant="h4" noWrap component="div">
                        {header}
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <IconButton size="large" onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Box mt={2}>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={cityValidation}
                        onSubmit={handleSubmit}
                    >
                        {({ values, handleChange, errors }) => (
                            <Form>
                                <Box sx={{ display: "flex", flexDirection: "column" }}>
                                    <Stack spacing={3}>
                                        <TextField
                                            autoComplete="off"
                                            name="name"
                                            label="Name"
                                            value={values.name}
                                            onChange={handleChange}
                                            error={Boolean(errors.name)}
                                            helperText={errors.name}
                                        />
                                        <Box sx={{ display: "flex" }}>
                                            <Box sx={{ flexGrow: 1 }} />
                                            <Button type="submit" variant="contained">
                                                Submit
                                            </Button>
                                        </Box>
                                    </Stack>
                                </Box>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Box>
        </Modal>
    );
};

CityModal.propTypes = {
    header: PropTypes.string,
    initialValues: PropTypes.object,
    handleSubmit: PropTypes.func,
    isOpen: PropTypes.bool,
    handleClose: PropTypes.func,
};

export default CityModal;
