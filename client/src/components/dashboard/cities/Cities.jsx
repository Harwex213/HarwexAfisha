import React, { useState } from "react";
import {
    Button,
    CircularProgress,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import CityModal from "./Modals";
import { useCitiesChunk, useCreateCity, useDeleteCity, useUpdateCity } from "../../../api/hooks/useCities";

const Cities = () => {
    const cities = useCitiesChunk();
    const createCityMutation = useCreateCity();
    const updateCityMutation = useUpdateCity();
    const deleteCityMutation = useDeleteCity();
    const [cityInitialValues, setCityInitialValues] = useState({
        name: "",
        isPopular: false,
    });
    const [isCreateCity, setIsCreateCity] = useState(false);
    const [isEditCity, setIsEditCity] = useState(false);

    const handleCreateCityOpen = () => {
        setCityInitialValues({
            name: "",
            isPopular: false,
        });
        setIsCreateCity(true);
    };
    const handleCreateCityClose = () => {
        setIsCreateCity(false);
    };
    const handleEditCityOpen = (city) => {
        setCityInitialValues({
            id: city.id,
            name: city.name,
            isPopular: city.isPopular,
        });
        setIsEditCity(true);
    };
    const handleEditCityClose = () => {
        setIsEditCity(false);
    };

    const handleCreateCity = (values) => {
        createCityMutation.mutate(values);
        handleCreateCityClose();
    };
    const handleEditCity = (values) => {
        updateCityMutation.mutate(values);
        handleEditCityClose();
    };
    const handleDeleteCity = (id) => {
        deleteCityMutation.mutate({ id });
    };

    return (
        <>
            <Button sx={{ mb: 3 }} variant="contained" onClick={handleCreateCityOpen}>
                Add City
            </Button>
            <Typography variant="h6" gutterBottom component="div">
                Cities
            </Typography>
            {cities.isSuccess ? (
                <TableContainer sx={{ mb: 4 }} component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Is popular</TableCell>
                                <TableCell align="center">Edit</TableCell>
                                <TableCell align="center">Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cities.data.map((city) => (
                                <TableRow
                                    key={city.id}
                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                >
                                    <TableCell>{city.id}</TableCell>
                                    <TableCell>{city.name}</TableCell>
                                    <TableCell>{city.isPopular ? "Yes" : "No"}</TableCell>
                                    <TableCell align="center">
                                        <Button onClick={() => handleEditCityOpen(city)}>Edit</Button>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button onClick={() => handleDeleteCity(city.id)}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Stack sx={{ alignItems: "center" }}>
                    <CircularProgress />
                </Stack>
            )}
            <CityModal
                header="Create city"
                isOpen={isCreateCity}
                initialValues={cityInitialValues}
                handleSubmit={handleCreateCity}
                handleClose={handleCreateCityClose}
            />
            <CityModal
                header="Edit city"
                isOpen={isEditCity}
                initialValues={cityInitialValues}
                handleSubmit={handleEditCity}
                handleClose={handleEditCityClose}
            />
        </>
    );
};

export default Cities;
