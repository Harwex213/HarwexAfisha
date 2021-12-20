import React, { useState } from "react";
import PropTypes from "prop-types";
import {
    Autocomplete,
    Box,
    Button,
    CircularProgress,
    Collapse,
    IconButton,
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
import SessionModal from "./Modals";
import dateFormat from "dateformat";
import { defaultCity } from "../../../common/constants/common";
import { usePopularCities } from "../../../api/hooks/useCities";
import { usePlacesChunk } from "../../../api/hooks/usePlaces";
import {
    useCreateSession,
    useDeleteSession,
    useSessionsChunk,
    useUpdateSession,
} from "../../../api/hooks/useSessions";
import { useEventPlacesChunk } from "../../../api/hooks/useEventPlaces";

const Row = ({ eventPlace, onSessionAdd, onSessionEdit, onSessionDelete }) => {
    const [isSessionsOpen, setIsSessionsOpen] = useState(false);
    const sessions = useSessionsChunk({ eventPlaceId: eventPlace.eventPlaceId });

    return (
        <>
            <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setIsSessionsOpen(!isSessionsOpen)}
                    >
                        {isSessionsOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>{eventPlace.eventId}</TableCell>
                <TableCell>{eventPlace.eventName}</TableCell>
                <TableCell align="center">
                    <Button onClick={() => onSessionAdd(eventPlace.eventPlaceId)}>Add</Button>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={24}>
                    <Collapse in={isSessionsOpen} timeout="auto" unmountOnExit>
                        {sessions.isSuccess ? (
                            <Box m={1}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Sessions
                                </Typography>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Id</TableCell>
                                            <TableCell>Time</TableCell>
                                            <TableCell>Price</TableCell>
                                            <TableCell>TicketsAmount</TableCell>
                                            <TableCell align="center">Edit</TableCell>
                                            <TableCell align="center">Delete</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {sessions.data.map((session) => (
                                            <TableRow key={session.id}>
                                                <TableCell>{session.id}</TableCell>
                                                <TableCell>{dateFormat(session.time, "default")}</TableCell>
                                                <TableCell>${session.price}</TableCell>
                                                <TableCell>{session.ticketsAmount}</TableCell>
                                                <TableCell align="center">
                                                    <Button
                                                        onClick={() =>
                                                            onSessionEdit(session, eventPlace.eventPlaceId)
                                                        }
                                                    >
                                                        Edit
                                                    </Button>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Button onClick={() => onSessionDelete(session.id)}>
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

const Sessions = () => {
    const [city, setCity] = useState(null);
    const [place, setPlace] = useState(null);
    const cities = usePopularCities({
        onSuccess: (data) => setCity(data.find((city) => city.name === defaultCity)),
    });
    const places = usePlacesChunk({ cityId: city?.id }, (data) =>
        setPlace(data.length !== 0 ? data[0] : null)
    );
    const eventPlaces = useEventPlacesChunk({ placeId: place?.id });
    const createSessionMutation = useCreateSession();
    const updateSessionMutation = useUpdateSession();
    const deleteSessionMutation = useDeleteSession();
    const [eventPlaceId, setEventPlaceId] = useState(null);
    const [sessionInitialValues, setSessionInitialValues] = useState({
        time: new Date(),
        price: "",
        ticketsAmount: "",
    });
    const [isCreateSession, setIsCreateSession] = useState(false);
    const [isEditSession, setIsEditSession] = useState(false);

    const handleCreateSessionOpen = (eventPlaceId) => {
        setEventPlaceId(eventPlaceId);
        setSessionInitialValues({
            time: new Date(),
            price: "",
            ticketsAmount: "",
        });
        setIsCreateSession(true);
    };
    const handleCreateSessionClose = () => {
        setEventPlaceId(null);
        setIsCreateSession(false);
    };
    const handleEditSessionOpen = (session, eventPlaceId) => {
        setEventPlaceId(eventPlaceId);
        setSessionInitialValues({
            id: session.id,
            time: session.time,
            price: session.price,
            ticketsAmount: session.ticketsAmount,
        });
        setIsEditSession(true);
    };
    const handleEditSessionClose = () => {
        setEventPlaceId(null);
        setIsEditSession(false);
    };

    const handleCreateSession = (values) => {
        createSessionMutation.mutate({
            eventPlaceId,
            ...values,
        });
        handleCreateSessionClose();
    };
    const handleEditSession = (values) => {
        updateSessionMutation.mutate({
            eventPlaceId,
            ...values,
        });
        handleEditSessionClose();
    };
    const handleDeleteSession = (id) => {
        deleteSessionMutation.mutate({ id });
    };

    return (
        <>
            <Stack direction="row" spacing={4}>
                <Autocomplete
                    sx={{ width: 150 }}
                    value={city}
                    onChange={(event, newValue) => {
                        setCity(newValue ?? cities.data.find((city) => city.name === defaultCity));
                    }}
                    options={cities.data ?? []}
                    loading={cities.isLoading}
                    getOptionLabel={(option) => option.name}
                    isOptionEqualToValue={(option, value) => option.name === value.name}
                    renderInput={(params) => <TextField {...params} label="City" />}
                />
                <Autocomplete
                    sx={{ width: 150 }}
                    value={place}
                    onChange={(event, newValue) => {
                        setPlace(newValue ?? (places.data.length !== 0 ? places.data[0] : null));
                    }}
                    options={places.data ?? []}
                    loading={places.isLoading}
                    disablePortal
                    getOptionLabel={(option) => option.name}
                    isOptionEqualToValue={(option, value) => option.name === value.name}
                    renderInput={(params) => <TextField {...params} label="Place" />}
                />
            </Stack>
            <Typography mt={3} variant="h6" gutterBottom component="div">
                Events
            </Typography>
            {eventPlaces.isSuccess ? (
                <TableContainer sx={{ mb: 4 }} component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell>Id</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell align="center">Add new Session</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {eventPlaces.data.map((eventPlace) => (
                                <Row
                                    key={eventPlace.eventPlaceId}
                                    eventPlace={eventPlace}
                                    onSessionAdd={handleCreateSessionOpen}
                                    onSessionEdit={handleEditSessionOpen}
                                    onSessionDelete={handleDeleteSession}
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
            <SessionModal
                header="Add session"
                isOpen={isCreateSession}
                initialValues={sessionInitialValues}
                handleSubmit={handleCreateSession}
                handleClose={handleCreateSessionClose}
            />
            <SessionModal
                header="Edit session"
                isOpen={isEditSession}
                initialValues={sessionInitialValues}
                handleSubmit={handleEditSession}
                handleClose={handleEditSessionClose}
            />
        </>
    );
};

Row.propTypes = {
    eventPlace: PropTypes.object,
    onSessionAdd: PropTypes.func,
    onSessionEdit: PropTypes.func,
    onSessionDelete: PropTypes.func,
};

export default Sessions;
