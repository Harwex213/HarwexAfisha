import React, { useState } from "react";
import {
    Box,
    Button,
    Paper,
    Popover,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import dateFormat from "dateformat";

const MyTicketList = () => {
    // TODO: fetch user tickets
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
        // TODO: mutate delete ticket
        handleReturnTicketPopoverClose();
        setTicketToReturn(null);
    };

    return (
        <>
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
                        {Array.from(Array(2)).map((_, index) => (
                            <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                <TableCell>Gomel, Cinema 0</TableCell>
                                <TableCell>The Hill</TableCell>
                                <TableCell>{dateFormat(new Date(), "default")}</TableCell>
                                <TableCell>$8.9</TableCell>
                                <TableCell>
                                    <Button onClick={(event) => handleReturnTicketButtonClick(event, index)}>
                                        Return
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
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
