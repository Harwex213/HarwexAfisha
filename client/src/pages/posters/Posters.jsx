import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { Box, FormControl, MenuItem, Select, TextField } from "@mui/material";
import { StaticDatePicker } from "@mui/lab";
import TicketOrder from "../../components/ticketOrder/TicketOrder";
import dateFormat from "dateformat";
import { useLocalStorage } from "../../common/hooks/useLocalStorage";
import { defaultCity } from "../../common/constants/common";
import PosterList from "../../components/posterList/PosterList";

const today = new Date();
const minDate = new Date();
minDate.setDate(minDate.getDate() - 1);
const dateValidation = yup.object().shape({
    date: yup.date().min(minDate, `Must be later than ${dateFormat(minDate, "yyyy-mm-dd")}`),
});

/* eslint-disable react/prop-types */
const Posters = () => {
    // TODO: fetch cities
    const navigate = useNavigate();
    const [date, setDate] = useState(today);
    const [city, setCity] = useLocalStorage("city", defaultCity);

    const onPosterClick = (eventId) => {
        navigate(eventId.toString());
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ marginBlock: "30px" }}>
                <Formik
                    initialValues={{
                        date: today,
                    }}
                    validationSchema={dateValidation}
                    onSubmit={(values) => values}
                >
                    {(props) => (
                        <Form>
                            <Box sx={{ display: "flex" }}>
                                <StaticDatePicker
                                    orientation="landscape"
                                    openTo="day"
                                    label="Choose date"
                                    value={props.values.date}
                                    minDate={today}
                                    onChange={(value) => {
                                        props.setFieldValue("date", value);
                                        setDate(value);
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            helperText={props.isValid ? "" : props.errors.date}
                                            error={Boolean(props.errors.date)}
                                        />
                                    )}
                                />
                                <Box>
                                    <FormControl
                                        variant="standard"
                                        sx={{ m: 1, minWidth: 120, marginLeft: "30px" }}
                                    >
                                        {/*TODO: change to autocomplete*/}
                                        <Select
                                            value={city}
                                            onChange={(event) => setCity(event.target.value)}
                                        >
                                            <MenuItem value="Minsk">Minsk</MenuItem>
                                            <MenuItem value="Vitebsk">Vitebsk</MenuItem>
                                            <MenuItem value="Gomel">Gomel</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                                <Box sx={{ flexGrow: 1 }} />
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Box>
            <Routes>
                <Route
                    path=""
                    element={<PosterList date={date} city={city} onPosterClick={onPosterClick} />}
                />
                <Route path=":eventId" element={<TicketOrder date={date} city={city} />} />
            </Routes>
        </Box>
    );
};

export default Posters;
