import React, { useState } from "react";
import {
    Box,
    Button,
    CircularProgress,
    Paper,
    Popover,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import dateFormat from "dateformat";
import { useReturnTicketMutation, useUserTickets } from "../../api/hooks/useTickets";

const MyTicketList = () => {
    const tickets = useUserTickets();
    const returnTicketMutation = useReturnTicketMutation();
    const [ticketToReturn, setTicketToReturn] = useState(null);
    const [anchorReturnTicket, setAnchorReturnTicket] = useState(null);
    const isReturnTicketPopoverOpen = Boolean(anchorReturnTicket);
    const handleReturnTicketPopoverClose = () => {
        setAnchorReturnTicket(null);
    };
    const handleReturnTicketButtonClick = (event, index) => {
        setAnchorReturnTicket(event.currentTarget);
        setTicketToReturn(index);
    };
    const handleReturnTicket = () => {
        returnTicketMutation.mutate({ id: ticketToReturn });
        handleReturnTicketPopoverClose();
        setTicketToReturn(null);
    };

    return (
        <>
            {tickets.isSuccess ? (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Place</TableCell>
                                <TableCell>Event</TableCell>
                                <TableCell>Time</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Return back</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tickets.data.map((ticket) => (
                                <TableRow
                                    key={ticket.id}
                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                >
                                    <TableCell>
                                        {ticket.placeCityName}, {ticket.placeName}
                                    </TableCell>
                                    <TableCell>{ticket.eventName}</TableCell>
                                    <TableCell>
                                        {dateFormat(ticket.sessionTime, "yyyy-mm-dd, HH:MM")}
                                    </TableCell>
                                    <TableCell>${ticket.sessionPrice}</TableCell>
                                    <TableCell>
                                        <Button
                                            onClick={(event) =>
                                                handleReturnTicketButtonClick(event, ticket.id)
                                            }
                                        >
                                            Return
                                        </Button>
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
            <Popover
                open={isReturnTicketPopoverOpen}
                anchorEl={anchorReturnTicket}
                onClose={handleReturnTicketPopoverClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
            >
                <Box p={2}>
                    <Typography component="div">Are you sure?</Typography>
                    <Box pt={1}>
                        <Button onClick={handleReturnTicketPopoverClose}>No</Button>
                        <Button onClick={handleReturnTicket}>Ok</Button>
                    </Box>
                </Box>
            </Popover>
        </>
    );
};

export default MyTicketList;
