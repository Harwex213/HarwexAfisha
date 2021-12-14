import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import dateFormat from "dateformat";
import PropTypes from "prop-types";

const TicketOrder = ({ date, city }) => {
    // TODO: fetch event by id
    // TODO: fetch sessions by event
    const { eventId } = useParams();
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate("../");
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
            <Box mt={5}>
                <Typography variant="h4" noWrap component="div">
                    Sessions
                </Typography>
                <Typography variant="subtitle1" noWrap component="div">
                    {city}. {dateFormat(date, "longDate")}
                </Typography>
            </Box>
        </Box>
    );
};

TicketOrder.propTypes = {
    date: PropTypes.object,
    city: PropTypes.string,
};

export default TicketOrder;
