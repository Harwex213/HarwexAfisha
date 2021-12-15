import React from "react";
import PropTypes from "prop-types";
import { Box, Grid, Paper, Typography } from "@mui/material";

const SessionList = ({ onSessionClick }) => {
    // TODO: fetch cinemas with sessions by event, date, city
    return (
        <Box>
            <Grid container rowSpacing={4} columns={{ xs: 24 }}>
                {Array.from(Array(9)).map((_, index) => (
                    <Grid item xs={24} key={index} sx={{ display: "flex" }}>
                        <Typography pt={0.5} width={150} variant="h6" component="div">
                            Cinema {index}
                        </Typography>
                        <Grid container spacing={{ xs: 2 }} columns={{ xs: 24 }}>
                            {Array.from(Array(2)).map((_, index) => (
                                <Grid item xs={2} key={index}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Paper elevation={2} onClick={() => onSessionClick(index)}>
                                            <Typography p={1} component="div" sx={{ cursor: "pointer" }}>
                                                19:30
                                            </Typography>
                                        </Paper>
                                        <Typography pt={1.5} component="div">
                                            14992
                                        </Typography>
                                        <Typography component="div">$8.2</Typography>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

SessionList.propTypes = {
    date: PropTypes.object,
    city: PropTypes.string,
    onSessionClick: PropTypes.func,
};

export default SessionList;
