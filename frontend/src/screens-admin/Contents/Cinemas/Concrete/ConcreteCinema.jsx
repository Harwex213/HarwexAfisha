import React, { useEffect, useState } from "react";
import useLocalStorage from "../../../../hooks/useLocalStorageState";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Divider, Select } from "antd";
import { useFindCinemaQuery } from "../../../../store/api/cinema";
import CinemaMovies from "../Movies/CinemaMovies";
import Halls from "../Halls/Halls";
import Sessions from "../Sessions/Sessions";
import debounce from "../../../../helpers/debounce";

const QueryCinema = ({ city }) => {
    const [cinema, setCinema] = useLocalStorage("cinemas/concrete");
    const { data, isSuccess } = useFindCinemaQuery({ cityId: city.id });

    const index = data?.rows?.findIndex((row) => row.id === cinema?.id);

    useEffect(() => {
        if (isSuccess && index === -1) {
            setCinema(data.rows[0]);
        }
    });

    if (isSuccess && data.rows.length === 0) {
        return <h2>No cinemas</h2>;
    }

    if (!isSuccess || index === -1) {
        return "Loading...";
    }

    return <ChooseCinema defaultValue={cinema} city={city} />;
};

const ChooseCinema = ({ defaultValue, city }) => {
    const location = useLocation();
    const [cinema, setCinema] = useLocalStorage("cinemas/concrete", defaultValue);
    const [cinemaName, setCinemaName] = useState("");
    const { data, isLoading } = useFindCinemaQuery({ name: cinemaName, cityId: city.id });

    const setCinemaNameDebounced = debounce((text) => {
        setCinemaName(text);
    }, 100);

    return (
        <>
            <p>Choose cinema:</p>
            <Select
                style={{ width: "250px" }}
                showSearch
                loading={isLoading}
                filterOption={false}
                onSearch={(text) => setCinemaNameDebounced(text)}
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
            <Routes>
                <Route path="movies" element={<CinemaMovies cinema={cinema} />} />
                <Route path="halls" element={<Halls cinema={cinema} />} />
                <Route path="sessions" element={<Sessions cinema={cinema} />} />
                <Route path="*" element={<Navigate to="movies" state={{ from: location }} replace />} />
            </Routes>
        </>
    );
};

export default QueryCinema;
