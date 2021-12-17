import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Box, CircularProgress, Autocomplete, TextField, Stack } from "@mui/material";
import { StaticDatePicker } from "@mui/lab";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { usePopularCities } from "../../api/hooks/useCities";
import TicketOrder from "../../components/ticketOrder/TicketOrder";
import PosterList from "../../components/posterList/PosterList";
import { defaultCity } from "../../common/constants/common";
import dateFormat from "dateformat";

const today = new Date();
const minDate = new Date();
minDate.setDate(minDate.getDate() - 1);
const dateValidation = yup.object().shape({
    date: yup.date().min(minDate, `Must be later than ${dateFormat(minDate, "yyyy-mm-dd")}`),
});

let firstTimeFetch = true;
/* eslint-disable react/prop-types */
const Posters = () => {
    const cities = usePopularCities();
    const navigate = useNavigate();
    const [date, setDate] = useState(today);
    const [city, setCity] = useState(null);

    useEffect(() => {
        if (firstTimeFetch && cities.isSuccess) {
            setCity(cities.data.find((city) => city.name === defaultCity));
            firstTimeFetch = false;
        }
    }, [cities, setCity]);

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
                            <Stack direction="row" sx={{ alignItems: "baseline" }}>
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
                                <Autocomplete
                                    sx={{ width: 300 }}
                                    options={cities.data ?? []}
                                    loading={cities.isLoading}
                                    isOptionEqualToValue={(option, value) => option.name === value.name}
                                    getOptionLabel={(option) => option.name}
                                    onChange={(event, city) => {
                                        setCity(
                                            city ?? cities.data.find((city) => city.name === defaultCity)
                                        );
                                    }}
                                    value={city}
                                    disablePortal
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Asynchronous"
                                            InputProps={{
                                                ...params.InputProps,
                                                endAdornment: (
                                                    <>
                                                        {cities.isLoading ? (
                                                            <CircularProgress color="inherit" size={20} />
                                                        ) : null}
                                                        {params.InputProps.endAdornment}
                                                    </>
                                                ),
                                            }}
                                        />
                                    )}
                                />
                                <Box sx={{ flexGrow: 1 }} />
                            </Stack>
                        </Form>
                    )}
                </Formik>
            </Box>
            <Routes>
                <Route
                    path=""
                    element={
                        city ? (
                            <PosterList date={date} cityId={city.id} onPosterClick={onPosterClick} />
                        ) : (
                            <Stack sx={{ alignItems: "center" }}>
                                <CircularProgress />
                            </Stack>
                        )
                    }
                />
                <Route path=":eventId" element={<TicketOrder date={date} city={city} />} />
            </Routes>
        </Box>
    );
};

export default Posters;
