import React from "react";
import PropTypes from "prop-types";
import { Paper, Typography } from "@mui/material";

const EventPoster = ({ event, onClick }) => {
    return (
        <Paper
            onClick={() => onClick(event.eventId)}
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
                src="https://m.media-amazon.com/images/M/MV5BMzIwYzRmZTQtOThhYy00YjIzLThkODEtMjE2MGRjYzY1ODY1XkEyXkFqcGdeQXVyNTE0MzczOTk@._V1_.jpg"
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
