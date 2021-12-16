import React, { useState } from "react";
import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import EventModal from "./Modals";

const Events = () => {
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
            name: event.name,
            description: event.description,
        });
        setIsEditEvent(true);
    };
    const handleEditEventClose = () => {
        setIsEditEvent(false);
    };

    const handleCreateEvent = (values) => {
        handleCreateEventClose();
        // TODO: mutate to create Event
    };
    const handleEditEvent = (values) => {
        handleEditEventClose();
        // TODO: mutate to edit Event
    };
    const handleDeleteEvent = () => {
        // TODO: mutate to delete Event
    };

    return (
        <>
            <Button sx={{ mb: 3 }} variant="contained" onClick={handleCreateEventOpen}>
                Add Event
            </Button>
            <Typography variant="h6" gutterBottom component="div">
                Events
            </Typography>
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
                        {Array.from(Array(5)).map((_, index) => (
                            <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                <TableCell>{index}</TableCell>
                                <TableCell>Event {index}</TableCell>
                                <TableCell>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, deserunt?
                                </TableCell>
                                <TableCell>
                                    <Button
                                        onClick={() =>
                                            handleEditEventOpen({
                                                name: "Joker",
                                                description: "kwkwkkwkwkkrejwkjrw\n rewjrkwelrkm",
                                            })
                                        }
                                    >
                                        Edit
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button onClick={handleDeleteEvent}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
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
