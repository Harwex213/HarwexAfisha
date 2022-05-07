import React, { useEffect, useState } from "react";
import useLocalStorage from "../../../../hooks/useLocalStorageState";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Divider, Select } from "antd";
import { useFindCinemaQuery } from "../../../../store/api/cinema";

const QueryCinema = ({ city }) => {
    const [cinema, setCinema] = useLocalStorage("cinemas/concrete");
    const { data, isSuccess } = useFindCinemaQuery({ cityId: city.id });

    const index = data?.rows?.findIndex((row) => row.id === cinema?.id);

    useEffect(() => {
        if (isSuccess && index === -1) {
            setCinema(data.rows[0]);
        }
    });

    if (!isSuccess || index === -1) {
        return "Loading...";
    }

    return <ChooseCinema defaultValue={cinema} city={city} />;
};

const ChooseCinema = ({ defaultValue, city }) => {
    const location = useLocation();
    const [cinema, setCinema] = useLocalStorage("cinemas/concrete", defaultValue);
    const [cinemaName, setCinemaName] = useState("");
    const { data, isLoading, isSuccess } = useFindCinemaQuery({ city: cinemaName, cityId: city.id });

    const routes = (
        <Routes>
            <Route
                path="movies"
                element={
                    <div>
                        {cinema.id} - {cinema.name} - {cinema.cityId}
                    </div>
                }
            />
            <Route
                path="halls"
                element={
                    <div>
                        {cinema.id} - {cinema.name} - {cinema.cityId}
                    </div>
                }
            />
            <Route path="*" element={<Navigate to="movies" state={{ from: location }} replace />} />
        </Routes>
    );

    return (
        <>
            <p>Choose cinema:</p>
            <Select
                style={{ width: "250px" }}
                showSearch
                loading={isLoading}
                filterOption={false}
                onSearch={(text) => setCinemaName(text)}
                value={cinema.id}
                defaultValue={defaultValue.id}
                onSelect={(value, option) => {
                    setCinemaName("");
                    setCinema({
                        id: option.value,
                        name: option.children,
                    });
                }}
            >
                {data?.rows?.map((row) => (
                    <Select.Option key={row.id} value={row.id}>
                        {row.name}
                    </Select.Option>
                ))}
            </Select>
            <Divider />
            {isSuccess ? routes : <div>Loading...</div>}
        </>
    );
};

export default QueryCinema;
