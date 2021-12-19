import React, { useState } from "react";
import {
    Button,
    CircularProgress,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import EventModal from "./Modals";
import { useEventsChunk, useCreateEvent, useUpdateEvent, useDeleteEvent } from "../../../api/hooks/useEvents";

const Events = () => {
    const events = useEventsChunk();
    const createEventMutation = useCreateEvent();
    const updateEventMutation = useUpdateEvent();
    const deleteEventMutation = useDeleteEvent();
    const [eventInitialValues, setEventInitialValues] = useState({
        name: "",
        description: "",
    });
    const [isCreateEvent, setIsCreateEvent] = useState(false);
    const [isEditEvent, setIsEditEvent] = useState(false);

    const handleCreateEventOpen = () => {
        setEventInitialValues({
            name: "",
            description: "",
        });
        setIsCreateEvent(true);
    };
    const handleCreateEventClose = () => {
        setIsCreateEvent(false);
    };
    const handleEditEventOpen = (event) => {
        setEventInitialValues({
            id: event.id,
            name: event.name,
            description: event.description,
        });
        setIsEditEvent(true);
    };
    const handleEditEventClose = () => {
        setIsEditEvent(false);
    };

    const handleCreateEvent = (values) => {
        createEventMutation.mutate(values);
        handleCreateEventClose();
    };
    const handleEditEvent = (values) => {
        updateEventMutation.mutate(values);
        handleEditEventClose();
    };
    const handleDeleteEvent = (id) => {
        deleteEventMutation.mutate({ id });
    };

    return (
        <>
            <Button sx={{ mb: 3 }} variant="contained" onClick={handleCreateEventOpen}>
                Add Event
            </Button>
            <Typography variant="h6" gutterBottom component="div">
                Events
            </Typography>
            {events.isSuccess ? (
                <TableContainer sx={{ mb: 4 }} component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell align="center">Edit</TableCell>
                                <TableCell align="center">Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {events.data.map((event) => (
                                <TableRow
                                    key={event.id}
                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                >
                                    <TableCell>{event.id}</TableCell>
                                    <TableCell>{event.name}</TableCell>
                                    <TableCell>{event.description}</TableCell>
                                    <TableCell>
                                        <Button onClick={() => handleEditEventOpen(event)}>Edit</Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button onClick={() => handleDeleteEvent(event.id)}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Stack sx={{ alignItems: "center" }}>
                    <CircularProgress />
                </Stack>
            )}
            <EventModal
                header="Create event"
                isOpen={isCreateEvent}
                initialValues={eventInitialValues}
                handleSubmit={handleCreateEvent}
                handleClose={handleCreateEventClose}
            />
            <EventModal
                header="Edit event"
                isOpen={isEditEvent}
                initialValues={eventInitialValues}
                handleSubmit={handleEditEvent}
                handleClose={handleEditEventClose}
            />
        </>
    );
};

export default Events;
