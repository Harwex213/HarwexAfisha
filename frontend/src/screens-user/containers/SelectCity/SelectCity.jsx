import React, { useEffect, useState } from "react";
import { Select } from "antd";
import useLocalStorage from "../../../hooks/useLocalStorageState";
import { useFindCityQuery } from "../../../store/api/city";
import debounce from "../../../helpers/debounce";
import { useDispatch } from "react-redux";
import { setCity as setCityAction } from "../../../store/slices/afishaSlice";

const key = "afisha/city";

const InitialCityFetch = (props) => {
    const dispatch = useDispatch();
    const city = localStorage.getItem(key);
    const { data, isSuccess } = useFindCityQuery({ name: "" });
    const index = city && isSuccess ? data.rows.findIndex((row) => row.id === city.id) : 0;

    useEffect(() => {
        if (isSuccess) {
            dispatch(setCityAction({ city }));
        }
    });

    if (!isSuccess) {
        return <></>;
    }

    return <SelectCity defaultValue={data.rows[index]} {...props} />;
};

const SelectCity = ({ defaultValue, ...rest }) => {
    const dispatch = useDispatch();
    const [city, setCity] = useLocalStorage(key, defaultValue);
    const [cityName, setCityName] = useState("");
    const { data, isLoading } = useFindCityQuery({ name: cityName });

    const setCityNameDebounced = debounce((text) => {
        setCityName(text);
    }, 100);
    const onSearch = (text) => {
        setCityNameDebounced(text);
    };
    const onSelect = (_, option) => {
        const city = {
            id: option.value,
            name: option.children,
        };
        setCity(city);
        dispatch(setCityAction({ city }));

        setCityName("");
    };

    return (
        <Select
            {...rest}
            showSearch
            loading={isLoading}
            filterOption={false}
            value={city.id}
            onSearch={onSearch}
            onSelect={onSelect}
        >
            {data &&
                data.rows.map((row) => (
                    <Select.Option key={row.id} value={row.id}>
                        {row.name}
                    </Select.Option>
                ))}
        </Select>
    );
};

export default InitialCityFetch;
