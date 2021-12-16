import React, { useState } from "react";
import PropTypes from "prop-types";
import {
    Autocomplete,
    Box,
    Button,
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

const Row = ({ eventPlace, onSessionAdd, onSessionEdit, onSessionDelete }) => {
    const [isSessionsOpen, setIsSessionsOpen] = useState(false);

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
                <TableCell>{eventPlace.id}</TableCell>
                <TableCell>Session {eventPlace.id}</TableCell>
                <TableCell align="center">
                    <Button onClick={onSessionAdd}>Add</Button>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={24}>
                    <Collapse in={isSessionsOpen} timeout="auto" unmountOnExit>
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
                                    {Array.from(Array(4)).map((_, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{index}</TableCell>
                                            <TableCell>{dateFormat(new Date(), "default")}</TableCell>
                                            <TableCell>8.92</TableCell>
                                            <TableCell>100</TableCell>
                                            <TableCell align="center">
                                                <Button
                                                    onClick={() =>
                                                        onSessionEdit({
                                                            time: new Date(),
                                                            price: 78.3,
                                                            ticketsAmount: 100,
                                                        })
                                                    }
                                                >
                                                    Edit
                                                </Button>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Button onClick={onSessionDelete}>Delete</Button>
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

const Sessions = () => {
    const [city, setCity] = useState({ name: defaultCity });
    const [place, setPlace] = useState({ name: "Cinema0" });
    const [sessionInitialValues, setSessionInitialValues] = useState({
        time: new Date(),
        price: "",
        ticketsAmount: "",
    });
    const [isCreateSession, setIsCreateSession] = useState(false);
    const [isEditSession, setIsEditSession] = useState(false);

    const handleCreateSessionOpen = () => {
        setSessionInitialValues({
            time: new Date(),
            price: "",
            ticketsAmount: "",
        });
        setIsCreateSession(true);
    };
    const handleCreateSessionClose = () => {
        setIsCreateSession(false);
    };
    const handleEditSessionOpen = (session) => {
        setSessionInitialValues({
            time: session.time,
            price: session.price,
            ticketsAmount: session.ticketsAmount,
        });
        setIsEditSession(true);
    };
    const handleEditSessionClose = () => {
        setIsEditSession(false);
    };

    const handleCreateSession = (values) => {
        handleCreateSessionClose();
        // TODO: mutate to create Session
    };
    const handleEditSession = (values) => {
        handleEditSessionClose();
        // TODO: mutate to edit Session
    };
    const handleDeleteSession = () => {
        // TODO: mutate to delete Session
    };

    return (
        <>
            <Stack direction="row" spacing={4} sx={{ mb: 3 }}>
                <Autocomplete
                    sx={{ width: 150 }}
                    value={city}
                    onChange={(event, newValue) => {
                        setCity(newValue);
                    }}
                    disablePortal
                    options={[{ name: "Minsk" }, { name: "Vitebsk" }, { name: "Gomel" }]}
                    getOptionLabel={(option) => option.name}
                    isOptionEqualToValue={(option, value) => option.name === value.name}
                    renderInput={(params) => <TextField {...params} label="City" />}
                />
                <Autocomplete
                    sx={{ width: 150 }}
                    value={place}
                    onChange={(event, newValue) => {
                        setPlace(newValue);
                    }}
                    disablePortal
                    options={[{ name: "Cinema0" }, { name: "Cinema2" }, { name: "Cinema1" }]}
                    getOptionLabel={(option) => option.name}
                    isOptionEqualToValue={(option, value) => option.name === value.name}
                    renderInput={(params) => <TextField {...params} label="Place" />}
                />
            </Stack>
            <Typography variant="h6" gutterBottom component="div">
                Events
            </Typography>
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
                        {Array.from(Array(5)).map((_, index) => (
                            <Row
                                key={index}
                                eventPlace={{ id: index }}
                                onSessionAdd={handleCreateSessionOpen}
                                onSessionEdit={handleEditSessionOpen}
                                onSessionDelete={handleDeleteSession}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
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
