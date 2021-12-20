import React from "react";
import { Box, Typography } from "@mui/material";
import MyTicketList from "../../components/myTicketList/MyTicketList";
import { useAuthContext } from "../../contexts/AuthContext";

const Profile = () => {
    const { user } = useAuthContext();

    return (
        <Box mt={5}>
            <Typography mb={3} variant="h4" noWrap component="div">
                Hello, {user.firstName} {user.lastName}
            </Typography>
            <MyTicketList />
        </Box>
    );
};

export default Profile;
