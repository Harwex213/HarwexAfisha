import React from "react";
import { Box, Typography } from "@mui/material";
import MyTicketList from "../../components/myTicketList/MyTicketList";

const Profile = () => {
    return (
        <Box mt={5}>
            <Typography mb={3} variant="h4" noWrap component="div">
                Hello, Oleg
            </Typography>
            <MyTicketList />
        </Box>
    );
};

export default Profile;
