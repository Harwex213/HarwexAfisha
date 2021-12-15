import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import dateFormat from "dateformat";
import PropTypes from "prop-types";
import SessionList from "../sessionList/SessionList";
import CloseIcon from "@mui/icons-material/Close";
import { routePaths } from "../../common/constants/routePaths";

const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    outline: "none",
    bgcolor: "#fff",
    p: 5,
};

const TicketOrder = ({ date, city }) => {
    const { eventId } = useParams();
    // TODO: fetch event by id
    const navigate = useNavigate();
    const [isTicketOrderOpen, setIsTicketOrderOpen] = useState(false);

    const handleBackClick = () => {
        navigate("../");
    };

    const handleSessionClick = () => {
        setIsTicketOrderOpen(true);
    };

    const handleTicketOrderClose = () => setIsTicketOrderOpen(false);

    const handleOrderClick = () => {
        // TODO: mutate on ordering ticket
        navigate("../" + routePaths.profile);
    };

    return (
        <Box>
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
                            The Hill
                        </Typography>
                        <IconButton size="large" color="inherit" onClick={handleBackClick}>
                            <ArrowBackIcon />
                        </IconButton>
                    </Box>
                    <Typography variant="body1" flexWrap component="div">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius eum fugit id libero
                        minus odit porro quidem, repellendus repudiandae saepe?
                    </Typography>
                </Box>
            </Box>
            <Box mt={5} mb={4}>
                <Typography variant="h4" noWrap component="div">
                    Sessions
                </Typography>
                <Typography variant="subtitle1" noWrap component="div">
                    {city}. {dateFormat(date, "longDate")}
                </Typography>
            </Box>
            <SessionList date={date} city={city} onSessionClick={handleSessionClick} />
            <Modal open={isTicketOrderOpen} onClose={handleTicketOrderClose}>
                <Box sx={modalStyle}>
                    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                        <Typography variant="h4" noWrap component="div">
                            The Hill
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        <IconButton size="large" onClick={handleTicketOrderClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Typography noWrap component="div">
                        Cinema 0, {city}
                    </Typography>
                    <Typography noWrap component="div">
                        {dateFormat(date, "shortDate")}, 19:30
                    </Typography>
                    <Typography noWrap component="div">
                        Amount of free tickets: 0
                    </Typography>
                    <Box mt={5} sx={{ display: "flex", alignItems: "center" }}>
                        <Box sx={{ display: "flex", alignItems: "baseline" }}>
                            <Typography mr={1} noWrap component="div">
                                Payment amount:
                            </Typography>
                            <Typography variant="h6" noWrap component="div">
                                $8.9
                            </Typography>
                        </Box>
                        <Box sx={{ flexGrow: 1 }} />
                        <Button variant="contained" onClick={handleOrderClick}>
                            Order
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
};

TicketOrder.propTypes = {
    date: PropTypes.object,
    city: PropTypes.string,
};

export default TicketOrder;
