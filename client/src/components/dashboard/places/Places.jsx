import React, { useState } from "react";
import {
    Autocomplete,
    Box,
    Button,
    Collapse,
    IconButton,
    Modal,
    Paper,
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

const placeValidation = yup.object().shape({
    name: yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
    about: yup.string().min(4, "Too Short!").max(200, "Too Long!"),
    city: yup.string().nullable().required("Required"),
});

const eventPlaceValidation = yup.object().shape({
    event: yup.string().nullable().required("Required"),
});

const EventPlaceModal = ({ handleSubmit, isOpen, handleClose }) => {
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
                        Minsk
                    </Typography>
                </Box>
                <Box mt={2}>
                    <Formik
                        initialValues={{
                            event: "The Hill",
                        }}
                        validationSchema={eventPlaceValidation}
                        onSubmit={handleSubmit}
                    >
                        {({ values, setFieldValue, errors }) => (
                            <Form>
                                <Box sx={{ display: "flex", flexDirection: "column" }}>
                                    <Autocomplete
                                        sx={{ mb: 2 }}
                                        name="event"
                                        label="Event"
                                        value={values.event}
                                        onChange={(event, value) => setFieldValue("event", value)}
                                        disablePortal
                                        options={["The Hill", "Decadence", "Dark Knight"]}
                                        renderInput={(params) => (
                                            <TextField
                                                error={Boolean(errors.event)}
                                                helperText={errors.event}
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

const PlaceModal = ({ header, initialValues, handleSubmit, isOpen, handleClose }) => {
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
                                        sx={{ mb: 2 }}
                                        name="city"
                                        label="City"
                                        value={values.city}
                                        onChange={(event, value) => setFieldValue("city", value)}
                                        disablePortal
                                        options={["Minsk", "Vitebsk", "Gomel"]}
                                        renderInput={(params) => (
                                            <TextField
                                                error={Boolean(errors.city)}
                                                helperText={errors.city}
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
                <TableCell>Place {place.id}</TableCell>
                <TableCell>Lorem ipsum dolor sit amet.</TableCell>
                <TableCell>Minsk</TableCell>
                <TableCell align="center">
                    <Button onClick={onEventAdd}>Add</Button>
                </TableCell>
                <TableCell align="center">
                    <Button onClick={() => onEdit({ name: "Place", about: "lorem", city: defaultCity })}>
                        Edit
                    </Button>
                </TableCell>
                <TableCell align="center">
                    <Button onClick={onDelete}>Delete</Button>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={24}>
                    <Collapse in={isEventsOpen} timeout="auto" unmountOnExit>
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
                                    {Array.from(Array(4)).map((_, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{index}</TableCell>
                                            <TableCell>The Hill</TableCell>
                                            <TableCell>Lorem ipsum dolor sit amet. wwwww</TableCell>
                                            <TableCell align="center">
                                                <Button onClick={onEventDelete}>Delete</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};

const Places = () => {
    const [city, setCity] = useState({ name: defaultCity });
    const [placeInitialValues, setPlaceInitialValues] = useState({
        name: "",
        about: "",
        city: defaultCity,
    });
    const [isCreatePlace, setIsCreatePlace] = useState(false);
    const [isEditPlace, setIsEditPlace] = useState(false);
    const [isCreateEventPlace, setIsCreateEventPlace] = useState(false);

    const handleCreatePlaceOpen = () => {
        setPlaceInitialValues({
            name: "",
            about: "",
            city: defaultCity,
        });
        setIsCreatePlace(true);
    };
    const handleCreatePlaceClose = () => {
        setIsCreatePlace(false);
    };
    const handleEditPlaceOpen = (place) => {
        setPlaceInitialValues({
            name: place.name,
            about: place.about,
            city: place.city,
        });
        setIsEditPlace(true);
    };
    const handleEditPlaceClose = () => {
        setIsEditPlace(false);
    };

    const handleCreatePlace = (values) => {
        handleCreatePlaceClose();
        // TODO: mutate to create place
    };
    const handleEditPlace = (values) => {
        handleEditPlaceClose();
        // TODO: mutate to edit place
    };
    const handleDeletePlace = () => {
        // TODO: mutate to delete place
    };

    const handleCreateEventPlaceOpen = () => {
        setIsCreateEventPlace(true);
    };
    const handleCreateEventPlaceClose = () => {
        setIsCreateEventPlace(false);
    };

    const handleCreateEventPlace = (values) => {
        handleCreateEventPlaceClose();
        // TODO: mutate to delete place
    };
    const handleDeleteEventPlace = () => {
        // TODO: mutate to delete place
    };

    return (
        <>
            <Autocomplete
                value={city}
                onChange={(event, newValue) => {
                    setCity(newValue);
                }}
                sx={{ width: 250, mb: 3 }}
                disablePortal
                options={[{ name: "Minsk" }, { name: "Vitebsk" }, { name: "Gomel" }]}
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
                        {Array.from(Array(5)).map((_, index) => (
                            <Row
                                key={index}
                                place={{ id: index }}
                                onEdit={handleEditPlaceOpen}
                                onDelete={handleDeletePlace}
                                onEventAdd={handleCreateEventPlaceOpen}
                                onEventDelete={handleDeleteEventPlace}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
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
    handleSubmit: PropTypes.func,
    isOpen: PropTypes.bool,
    handleClose: PropTypes.func,
};

export default Places;
