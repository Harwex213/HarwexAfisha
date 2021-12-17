import React from "react";
import PropTypes from "prop-types";
import { Box, Button, CircularProgress, Grid, Paper, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useSessionsByDateEventCity } from "../../api/hooks/useSessions";
import dateFormat from "dateformat";

const SessionList = ({ onSessionClick, date, cityId }) => {
    const { eventId } = useParams();
    const places = useSessionsByDateEventCity({ date, cityId, eventId });

    let gridItems = (
        <Grid item xs={24}>
            <Stack sx={{ alignItems: "center" }}>
                <CircularProgress />
            </Stack>
        </Grid>
    );
    if (places.isSuccess) {
        gridItems = places.data.map((place) => (
            <Grid item xs={24} key={place.placeId} sx={{ display: "flex" }}>
                <Typography pt={0.5} width={150} variant="h6" component="div">
                    {place.placeName}
                </Typography>
                <Grid container spacing={{ xs: 2 }} columns={{ xs: 24 }}>
                    {place.sessions.map((session) => (
                        <Grid item xs={2} key={session.id}>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            >
                                <Button
                                    disabled={
                                        session.freeTickets === 0 || new Date(session.time) < new Date()
                                    }
                                    sx={{ mb: 0.5 }}
                                    component={Paper}
                                    onClick={() => onSessionClick({ session, place })}
                                >
                                    {dateFormat(session.time, "HH:MM")}
                                </Button>
                                <Typography component="div">${session.price}</Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        ));
    }

    return (
        <Box>
            <Grid container rowSpacing={4} columns={{ xs: 24 }}>
                {gridItems}
            </Grid>
        </Box>
    );
};

SessionList.propTypes = {
    date: PropTypes.object,
    cityId: PropTypes.string,
    onSessionClick: PropTypes.func,
};

export default SessionList;
