import React, { useState } from "react";
import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import CityModal from "./Modals";

const Cities = () => {
    const [cityInitialValues, setCityInitialValues] = useState({
        name: "",
    });
    const [isCreateCity, setIsCreateCity] = useState(false);
    const [isEditCity, setIsEditCity] = useState(false);

    const handleCreateCityOpen = () => {
        setCityInitialValues({
            name: "",
        });
        setIsCreateCity(true);
    };
    const handleCreateCityClose = () => {
        setIsCreateCity(false);
    };
    const handleEditCityOpen = (city) => {
        setCityInitialValues({
            name: city.name,
        });
        setIsEditCity(true);
    };
    const handleEditCityClose = () => {
        setIsEditCity(false);
    };

    const handleCreateCity = (values) => {
        handleCreateCityClose();
        // TODO: mutate to create City
    };
    const handleEditCity = (values) => {
        handleEditCityClose();
        // TODO: mutate to edit City
    };
    const handleDeleteCity = () => {
        // TODO: mutate to delete City
    };

    return (
        <>
            <Button sx={{ mb: 3 }} variant="contained" onClick={handleCreateCityOpen}>
                Add City
            </Button>
            <Typography variant="h6" gutterBottom component="div">
                Cities
            </Typography>
            <TableContainer sx={{ mb: 4 }} component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell align="center">Edit</TableCell>
                            <TableCell align="center">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.from(Array(5)).map((_, index) => (
                            <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                <TableCell>{index}</TableCell>
                                <TableCell>City {index}</TableCell>
                                <TableCell>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, deserunt?
                                </TableCell>
                                <TableCell>
                                    <Button
                                        onClick={() =>
                                            handleEditCityOpen({
                                                name: "Joker",
                                                description: "kwkwkkwkwkkrejwkjrw\n rewjrkwelrkm",
                                            })
                                        }
                                    >
                                        Edit
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button onClick={handleDeleteCity}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
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
