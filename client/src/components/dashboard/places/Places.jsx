import React, { useState } from "react";
import {
    Autocomplete,
    Box,
    Button,
    CircularProgress,
    Collapse,
    IconButton,
    Modal,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PropTypes from "prop-types";
import { defaultCity } from "../../../common/constants/common";
import CloseIcon from "@mui/icons-material/Close";
import { modalStyle } from "../../../common/styles/material";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { usePopularCities } from "../../../api/hooks/useCities";
import { useCreatePlace, useDeletePlace, usePlacesChunk, useUpdatePlace } from "../../../api/hooks/usePlaces";
import {
    useCreateEventPlace,
    useDeleteEventPlace,
    useEventPlacesChunk,
} from "../../../api/hooks/useEventPlaces";
import { useEventsChunk } from "../../../api/hooks/useEvents";
import queryClient from "../../../app/queryClient";

const placeValidation = yup.object().shape({
    name: yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
    about: yup.string().min(4, "Too Short!").max(200, "Too Long!"),
    cityId: yup.number().nullable().required("Required"),
});

const eventPlaceValidation = yup.object().shape({
    eventId: yup.string().nullable().required("Required"),
});

const EventPlaceModal = ({ city, handleSubmit, isOpen, handleClose }) => {
    const events = useEventsChunk({
        onSuccess: (data) => setEvent(data.length !== 0 ? data[0] : null),
    });
    const [event, setEvent] = useState(null);

    return (
        <Modal open={isOpen} onClose={handleClose}>
            <Box sx={modalStyle}>
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <Typography variant="h4" noWrap component="div">
                        Add Event
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <IconButton size="large" onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Box sx={{ display: "flex", alignItems: "baseline" }}>
                    <Typography mr={1} noWrap component="div">
                        Place:
                    </Typography>
                    <Typography variant="h6" noWrap component="div">
                        {city}
                    </Typography>
                </Box>
                <Box mt={2}>
                    {event ? (
                        <Formik
                            initialValues={{
                                eventId: event?.id,
                            }}
                            validationSchema={eventPlaceValidation}
                            onSubmit={handleSubmit}
                        >
                            {({ setFieldValue, errors }) => (
                                <Form>
                                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                                        <Autocomplete
                                            value={event}
                                            onChange={(event, value) => {
                                                const newValue =
                                                    value ??
                                                    (events.data?.length !== 0 ? events.data[0] : null);
                                                setEvent(newValue);
                                                setFieldValue("eventId", newValue.id);
                                            }}
                                            sx={{ mb: 2 }}
                                            label="Event"
                                            options={events.data}
                                            loading={events.isLoading}
                                            getOptionLabel={(option) => option.name}
                                            isOptionEqualToValue={(option, value) =>
                                                option.name === value.name
                                            }
                                            renderInput={(params) => (
                                                <TextField
                                                    error={Boolean(errors.eventId)}
                                                    helperText={errors.eventId}
                                                    {...params}
                                                />
                                            )}
                                        />
                                        <Box sx={{ display: "flex" }}>
                                            <Box sx={{ flexGrow: 1 }} />
                                            <Button type="submit" variant="contained">
                                                Submit
                                            </Button>
                                        </Box>
                                    </Box>
                                </Form>
                            )}
                        </Formik>
                    ) : (
                        <Stack sx={{ alignItems: "center" }}>
                            <CircularProgress />
                        </Stack>
                    )}
                </Box>
            </Box>
        </Modal>
    );
};

const PlaceModal = ({ header, initialValues, handleSubmit, isOpen, handleClose }) => {
    const cities = usePopularCities({
        onSuccess: (data) => setCity(data.find((city) => city.name === defaultCity)),
    });
    const [city, setCity] = useState(null);

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
                        validationSchema={placeValidation}
                        onSubmit={handleSubmit}
                    >
                        {({ values, setFieldValue, handleChange, errors }) => (
                            <Form>
                                <Box sx={{ display: "flex", flexDirection: "column" }}>
                                    <TextField
                                        sx={{ mb: 2 }}
                                        name="name"
                                        label="Name"
                                        value={values.name}
                                        onChange={handleChange}
                                        error={Boolean(errors.name)}
                                        helperText={errors.name}
                                    />
                                    <TextField
                                        sx={{ mb: 2 }}
                                        name="about"
                                        label="About"
                                        multiline
                                        value={values.about}
                                        onChange={handleChange}
                                        error={Boolean(errors.about)}
                                        helperText={errors.about}
                                    />
                                    <Autocomplete
                                        value={city}
                                        onChange={(event, value) => {
                                            const newValue =
                                                value ??
                                                cities.data.find((city) => city.name === defaultCity);
                                            setCity(newValue);
                                            setFieldValue("cityId", newValue.id);
                                        }}
                                        sx={{ mb: 2 }}
                                        label="City"
                                        options={cities.data}
                                        loading={cities.isLoading}
                                        getOptionLabel={(option) => option.name}
                                        isOptionEqualToValue={(option, value) => option.name === value.name}
                                        disablePortal
                                        renderInput={(params) => (
                                            <TextField
                                                error={Boolean(errors.cityId)}
                                                helperText={errors.cityId}
                                                {...params}
                                            />
                                        )}
                                    />
                                    <Box sx={{ display: "flex" }}>
                                        <Box sx={{ flexGrow: 1 }} />
                                        <Button type="submit" variant="contained">
                                            Submit
                                        </Button>
                                    </Box>
                                </Box>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Box>
        </Modal>
    );
};

const Row = ({ place, onEdit, onDelete, onEventAdd, onEventDelete }) => {
    const [isEventsOpen, setIsEventsOpen] = useState(false);
    const eventPlaces = useEventPlacesChunk({ placeId: place.id });

    return (
        <>
            <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setIsEventsOpen(!isEventsOpen)}
                    >
                        {isEventsOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>{place.id}</TableCell>
                <TableCell>{place.name}</TableCell>
                <TableCell>{place.about}</TableCell>
                <TableCell>{place.cityName}</TableCell>
                <TableCell align="center">
                    <Button onClick={() => onEventAdd(place.id)}>Add</Button>
                </TableCell>
                <TableCell align="center">
                    <Button onClick={() => onEdit(place)}>Edit</Button>
                </TableCell>
                <TableCell align="center">
                    <Button onClick={() => onDelete(place.id)}>Delete</Button>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={24}>
                    <Collapse in={isEventsOpen} timeout="auto" unmountOnExit>
                        {eventPlaces.isSuccess ? (
                            <Box m={1}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Events
                                </Typography>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Id</TableCell>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Description</TableCell>
                                            <TableCell align="center">Delete</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {eventPlaces.data.map((eventPlace) => (
                                            <TableRow key={eventPlace.eventPlaceId}>
                                                <TableCell>{eventPlace.eventId}</TableCell>
                                                <TableCell>{eventPlace.eventName}</TableCell>
                                                <TableCell>{eventPlace.eventDescription}</TableCell>
                                                <TableCell align="center">
                                                    <Button
                                                        onClick={() =>
                                                            onEventDelete({
                                                                id: eventPlace.eventPlaceId,
                                                                placeId: place.id,
                                                            })
                                                        }
                                                    >
                                                        Delete
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Box>
                        ) : (
                            <Stack sx={{ alignItems: "center" }}>
                                <CircularProgress />
                            </Stack>
                        )}
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};

const Places = () => {
    const cities = usePopularCities({
        onSuccess: (data) => setCity(data.find((city) => city.name === defaultCity)),
    });
    const [city, setCity] = useState(null);
    const [placeId, setPlaceId] = useState(null);
    const places = usePlacesChunk({ cityId: city?.id });
    const createPlaceMutation = useCreatePlace();
    const updatePlaceMutation = useUpdatePlace();
    const deletePlaceMutation = useDeletePlace();
    const createEventPlaceMutation = useCreateEventPlace();
    const deleteEventPlaceMutation = useDeleteEventPlace();
    const [placeInitialValues, setPlaceInitialValues] = useState({
        name: "",
        about: "",
        cityId: city?.id,
    });
    const [isCreatePlace, setIsCreatePlace] = useState(false);
    const [isEditPlace, setIsEditPlace] = useState(false);
    const [isCreateEventPlace, setIsCreateEventPlace] = useState(false);

    const handleCreatePlaceOpen = () => {
        setPlaceInitialValues({
            name: "",
            about: "",
            cityId: city?.id,
        });
        setIsCreatePlace(true);
    };
    const handleCreatePlaceClose = () => {
        setIsCreatePlace(false);
    };
    const handleEditPlaceOpen = (place) => {
        setPlaceInitialValues({
            id: place.id,
            name: place.name,
            about: place.about,
            cityId: place.cityId,
        });
        setIsEditPlace(true);
    };
    const handleEditPlaceClose = () => {
        setIsEditPlace(false);
    };

    const handleCreatePlace = (values) => {
        createPlaceMutation.mutate(values);
        handleCreatePlaceClose();
    };
    const handleEditPlace = (values) => {
        updatePlaceMutation.mutate(values);
        handleEditPlaceClose();
    };
    const handleDeletePlace = (id) => {
        deletePlaceMutation.mutate({ id });
    };

    const handleCreateEventPlaceOpen = (id) => {
        setPlaceId(id);
        setIsCreateEventPlace(true);
    };
    const handleCreateEventPlaceClose = () => {
        setPlaceId(null);
        setIsCreateEventPlace(false);
    };

    const handleCreateEventPlace = (values) => {
        createEventPlaceMutation.mutate(
            {
                placeId: placeId,
                eventId: values.eventId,
            },
            {
                onSuccess: () => queryClient.invalidateQueries(["eventPlaces", { type: "chunk", placeId }]),
            }
        );
        handleCreateEventPlaceClose();
    };
    const handleDeleteEventPlace = ({ id, placeId }) => {
        deleteEventPlaceMutation.mutate(
            { id },
            {
                onSuccess: () => queryClient.invalidateQueries(["eventPlaces", { type: "chunk", placeId }]),
            }
        );
    };

    return (
        <>
            <Autocomplete
                value={city}
                onChange={(event, newValue) => {
                    setCity(newValue ?? cities.data.find((city) => city.name === defaultCity));
                }}
                sx={{ width: 250, mb: 3 }}
                disablePortal
                options={cities.data ?? []}
                loading={cities.isLoading}
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={(option, value) => option.name === value.name}
                renderInput={(params) => <TextField {...params} label="City" />}
            />
            <Button sx={{ mb: 3 }} variant="contained" onClick={handleCreatePlaceOpen}>
                Add Place
            </Button>
            <Typography variant="h6" gutterBottom component="div">
                Places
            </Typography>
            {places.isSuccess ? (
                <TableContainer sx={{ mb: 4 }} component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell>Id</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>About</TableCell>
                                <TableCell>City</TableCell>
                                <TableCell align="center">Add new event</TableCell>
                                <TableCell align="center">Edit</TableCell>
                                <TableCell align="center">Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {places.data.map((place) => (
                                <Row
                                    key={place.id}
                                    place={place}
                                    onEdit={handleEditPlaceOpen}
                                    onDelete={handleDeletePlace}
                                    onEventAdd={handleCreateEventPlaceOpen}
                                    onEventDelete={handleDeleteEventPlace}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Stack sx={{ alignItems: "center" }}>
                    <CircularProgress />
                </Stack>
            )}
            <PlaceModal
                header="Add place"
                isOpen={isCreatePlace}
                initialValues={placeInitialValues}
                handleSubmit={handleCreatePlace}
                handleClose={handleCreatePlaceClose}
            />
            <PlaceModal
                header="Edit place"
                isOpen={isEditPlace}
                initialValues={placeInitialValues}
                handleSubmit={handleEditPlace}
                handleClose={handleEditPlaceClose}
            />
            <EventPlaceModal
                isOpen={isCreateEventPlace}
                handleSubmit={handleCreateEventPlace}
                handleClose={handleCreateEventPlaceClose}
                city={city?.name}
            />
        </>
    );
};

Row.propTypes = {
    place: PropTypes.object,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    onEventAdd: PropTypes.func,
    onEventDelete: PropTypes.func,
};

PlaceModal.propTypes = {
    header: PropTypes.string,
    initialValues: PropTypes.object,
    handleSubmit: PropTypes.func,
    isOpen: PropTypes.bool,
    handleClose: PropTypes.func,
};

EventPlaceModal.propTypes = {
    city: PropTypes.string,
    handleSubmit: PropTypes.func,
    isOpen: PropTypes.bool,
    handleClose: PropTypes.func,
};

export default Places;
