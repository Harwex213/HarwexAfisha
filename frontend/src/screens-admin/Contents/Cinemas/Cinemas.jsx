import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Divider, Select } from "antd";
import useLocalStorage from "../../../hooks/useLocalStorageState";
import { useFindCityQuery } from "../../../store/api/city";
import CinemasDataView from "./CinemasDataView";
import ConcreteCinema from "./Concrete/ConcreteCinema";

const QueryCity = () => {
    const [city, setCity] = useLocalStorage("cinemas/city");
    const { data, isSuccess } = useFindCityQuery({});

    const index = data?.rows?.findIndex((row) => row.id === city?.id);

    useEffect(() => {
        if (isSuccess && index === -1) {
            setCity(data.rows[0]);
        }
    });

    if (!isSuccess || index === -1) {
        return "Loading...";
    }

    return <ChooseCinema defaultValue={city} />;
};

const ChooseCinema = ({ defaultValue }) => {
    const [city, setCity] = useLocalStorage("cinemas/city", defaultValue);
    const [cityName, setCityName] = useState("");
    const { data, isLoading, isSuccess } = useFindCityQuery({ name: cityName });

    const routes = (
        <Routes>
            <Route path="" element={<CinemasDataView city={city} />} />
            <Route path="*" element={<ConcreteCinema city={city} />} />
        </Routes>
    );

    return (
        <>
            <p>Choose city:</p>
            <Select
                style={{ width: "100px" }}
                showSearch
                loading={isLoading}
                filterOption={false}
                onSearch={(text) => setCityName(text)}
                value={city.id}
                defaultValue={defaultValue.id}
                onSelect={(value, option) => {
                    setCityName("");
                    setCity({
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

export default QueryCity;
