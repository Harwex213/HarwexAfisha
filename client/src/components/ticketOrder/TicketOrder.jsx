import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, CircularProgress, IconButton, Modal, Stack, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import dateFormat from "dateformat";
import PropTypes from "prop-types";
import SessionList from "../sessionList/SessionList";
import { routePaths } from "../../common/constants/routePaths";
import { useEvent } from "../../api/hooks/useEvents";
import { modalStyle } from "../../common/styles/material";
import CloseIcon from "@mui/icons-material/Close";
import { useOrderTicketMutation } from "../../api/hooks/useTickets";

const TicketOrder = ({ date, city }) => {
    const { eventId } = useParams();
    const event = useEvent({ id: eventId });
    const orderTicketMutation = useOrderTicketMutation();
    const navigate = useNavigate();
    const [isTicketOrderOpen, setIsTicketOrderOpen] = useState(false);
    const [selectedSessionAndPlace, setSelectedSessionAndPlace] = useState(null);

    const handleBackClick = () => {
        navigate("..");
    };

    const handleSessionClick = ({ session, place }) => {
        setSelectedSessionAndPlace({ session, place });
        setIsTicketOrderOpen(true);
    };

    const handleTicketOrderClose = () => {
        setSelectedSessionAndPlace(null);
        setIsTicketOrderOpen(false);
    };

    const handleOrderClick = async () => {
        await orderTicketMutation.mutate(
            { sessionId: selectedSessionAndPlace.session.id },
            {
                onSettled: () => navigate("../" + routePaths.profile),
            }
        );
    };

    return (
        <Box>
            {event.isSuccess ? (
                <Box sx={{ display: "flex" }}>
                    <img
                        style={{
                            width: "280px",
                            borderRadius: "5px",
                        }}
                        src="https://i.pinimg.com/originals/bc/d5/c9/bcd5c9519581acc60bd60a429ab0c88f.jpg"
                        alt="movie poster"
                    />
                    <Box ml={5}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Typography mr={2} variant="h2" noWrap component="div">
                                {event.data.name}
                            </Typography>
                            <IconButton size="large" color="inherit" onClick={handleBackClick}>
                                <ArrowBackIcon />
                            </IconButton>
                        </Box>
                        <Typography variant="body1" flexWrap component="div">
                            {event.data.description}
                        </Typography>
                    </Box>
                </Box>
            ) : (
                <Stack sx={{ alignItems: "center" }}>
                    <CircularProgress />
                </Stack>
            )}

            <Box mt={5} mb={4}>
                <Typography variant="h4" noWrap component="div">
                    Sessions
                </Typography>
                <Typography variant="subtitle1" noWrap component="div">
                    {city.name}. {dateFormat(date, "longDate")}
                </Typography>
            </Box>
            <Box mb={15}>
                <SessionList date={date} cityId={city.id} onSessionClick={handleSessionClick} />
            </Box>
            {selectedSessionAndPlace ? (
                <Modal open={isTicketOrderOpen} onClose={handleTicketOrderClose}>
                    <Box sx={modalStyle}>
                        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                            <Typography variant="h4" noWrap component="div">
                                {event.data.name}
                            </Typography>
                            <Box sx={{ flexGrow: 1 }} />
                            <IconButton size="large" onClick={handleTicketOrderClose}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                        <Typography noWrap component="div">
                            {selectedSessionAndPlace.place.placeName}, {city.name}
                        </Typography>
                        <Typography noWrap component="div">
                            {dateFormat(date, "shortDate")},{" "}
                            {dateFormat(selectedSessionAndPlace.session.time, "HH:MM")}
                        </Typography>
                        <Typography noWrap component="div">
                            Amount of free tickets: {selectedSessionAndPlace.session.freeTickets}
                        </Typography>
                        <Box mt={5} sx={{ display: "flex", alignItems: "center" }}>
                            <Box sx={{ display: "flex", alignItems: "baseline" }}>
                                <Typography mr={1} noWrap component="div">
                                    Payment amount:
                                </Typography>
                                <Typography variant="h6" noWrap component="div">
                                    ${selectedSessionAndPlace.session.price}
                                </Typography>
                            </Box>
                            <Box sx={{ flexGrow: 1 }} />
                            <Button variant="contained" onClick={handleOrderClick}>
                                Order
                            </Button>
                        </Box>
                    </Box>
                </Modal>
            ) : (
                <></>
            )}
        </Box>
    );
};

TicketOrder.propTypes = {
    date: PropTypes.object,
    city: PropTypes.object,
};

export default TicketOrder;
