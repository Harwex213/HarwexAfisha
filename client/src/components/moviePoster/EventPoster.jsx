import React from "react";
import PropTypes from "prop-types";
import { Paper, Typography } from "@mui/material";

const EventPoster = ({ event, onClick }) => {
    return (
        <Paper
            onClick={() => onClick(event.id)}
            elevation={0}
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
            }}
        >
            <img
                style={{
                    width: "100%",
                    borderRadius: "5px",
                }}
                src="https://i.pinimg.com/originals/bc/d5/c9/bcd5c9519581acc60bd60a429ab0c88f.jpg"
                alt="movie poster"
            />
            <Typography variant="h6" component="div">
                {event.eventName}
            </Typography>
            <Typography variant="subtitle1" component="div">
                От ${event.minPrice}
            </Typography>
        </Paper>
    );
};

EventPoster.propTypes = {
    event: PropTypes.object,
    onClick: PropTypes.func,
};

export default EventPoster;
