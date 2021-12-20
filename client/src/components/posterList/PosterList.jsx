import React from "react";
import { Box, CircularProgress, Grid, Stack } from "@mui/material";
import EventPoster from "../moviePoster/EventPoster";
import PropTypes from "prop-types";
import { useEventsByCityDate } from "../../api/hooks/useEvents";

const PosterList = ({ date, cityId, onPosterClick }) => {
    const events = useEventsByCityDate({ cityId, date });

    let gridItems = (
        <Grid item xs={4}>
            <Stack sx={{ alignItems: "center" }}>
                <CircularProgress />
            </Stack>
        </Grid>
    );
    if (events.isSuccess) {
        gridItems = events.data.map((event) => (
            <Grid item xs={2} sm={4} md={4} key={event.eventId}>
                <EventPoster event={event} onClick={onPosterClick} />
            </Grid>
        ));
    }

    return (
        <Box mb={10}>
            <Grid
                container
                rowSpacing={{ xs: 4, md: 4 }}
                spacing={{ xs: 2, md: 4 }}
                columns={{ xs: 4, sm: 12, md: 20 }}
            >
                {gridItems}
            </Grid>
        </Box>
    );
};

PosterList.propTypes = {
    onPosterClick: PropTypes.func,
    date: PropTypes.object,
    cityId: PropTypes.string,
};

export default PosterList;
