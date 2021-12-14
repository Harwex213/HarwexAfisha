import React from "react";
import { Box, Grid } from "@mui/material";
import EventPoster from "../moviePoster/EventPoster";
import PropTypes from "prop-types";

const PosterList = ({ date, city, onPosterClick }) => {
    // TODO: fetch events by city + date

    return (
        <Box>
            <Grid
                container
                rowSpacing={{ xs: 4, md: 4 }}
                spacing={{ xs: 2, md: 4 }}
                columns={{ xs: 4, sm: 12, md: 20 }}
            >
                {Array.from(Array(9)).map((_, index) => (
                    <Grid item xs={2} sm={4} md={4} key={index}>
                        <EventPoster event={{ id: index }} onClick={onPosterClick} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

PosterList.propTypes = {
    onPosterClick: PropTypes.func,
    date: PropTypes.object,
    city: PropTypes.string,
};

export default PosterList;
