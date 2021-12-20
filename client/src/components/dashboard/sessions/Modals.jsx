import React from "react";
import PropTypes from "prop-types";
import { Box, Button, IconButton, Modal, Stack, TextField, Typography } from "@mui/material";
import { DateTimePicker } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import { Form, Formik } from "formik";
import * as yup from "yup";
import dateFormat from "dateformat";
import { modalStyle } from "../../../common/styles/material";

const sessionValidation = yup.object().shape({
    time: yup
        .date()
        .typeError("Type correct time")
        .required("Required!")
        .min(new Date(), `Must be later than ${dateFormat(new Date(), "mm/dd/yyyy HH:MM")}`),
    price: yup
        .number("Only numbers accepting")
        .nullable()
        .positive("Only positive accepting")
        .required("Required!")
        .round("floor"),
    ticketsAmount: yup
        .number("Only numbers accepting")
        .nullable()
        .positive("Only positive accepting")
        .integer("Only integer accepting")
        .required("Required!"),
});

const SessionModal = ({ header, initialValues, handleSubmit, isOpen, handleClose }) => {
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
                        validationSchema={sessionValidation}
                        onSubmit={handleSubmit}
                    >
                        {({ values, setFieldValue, handleChange, errors }) => (
                            <Form>
                                <Box sx={{ display: "flex", flexDirection: "column" }}>
                                    <Stack spacing={3}>
                                        <DateTimePicker
                                            label="Choose date"
                                            value={values.time}
                                            minDateTime={new Date()}
                                            onChange={(value) => {
                                                setFieldValue("time", value);
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    name="time"
                                                    helperText={errors.time}
                                                    error={Boolean(errors.time)}
                                                />
                                            )}
                                        />
                                        <TextField
                                            autoComplete="off"
                                            name="price"
                                            label="Price"
                                            value={values.price}
                                            onChange={handleChange}
                                            error={Boolean(errors.price)}
                                            helperText={errors.price}
                                            type="number"
                                        />
                                        <TextField
                                            autoComplete="off"
                                            name="ticketsAmount"
                                            label="Tickets amount"
                                            value={values.ticketsAmount}
                                            onChange={handleChange}
                                            error={Boolean(errors.ticketsAmount)}
                                            helperText={errors.ticketsAmount}
                                            type="number"
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

SessionModal.propTypes = {
    header: PropTypes.string,
    initialValues: PropTypes.object,
    handleSubmit: PropTypes.func,
    isOpen: PropTypes.bool,
    handleClose: PropTypes.func,
};

export default SessionModal;
