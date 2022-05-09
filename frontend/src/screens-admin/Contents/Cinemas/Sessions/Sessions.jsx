import React, { useEffect, useState } from "react";
import { DatePicker, Divider, Select } from "antd";
import useLocalStorage from "../../../../hooks/useLocalStorageState";
import { useFindHallQuery } from "../../../../store/api/hall";
import SessionsDataView from "./SessionsDataView";
import moment from "moment";
import debounce from "../../../../helpers/debounce";

const QueryHall = ({ cinema }) => {
    const [hall, setHall] = useLocalStorage("cinemas/hall");
    const { data, isSuccess } = useFindHallQuery({ cinemaId: cinema.id });

    const index = data?.rows?.findIndex((row) => row.id === hall?.id);

    useEffect(() => {
        if (isSuccess && index === -1 && data.rows.length !== 0) {
            setHall(data.rows[0]);
        }
    });

    if (isSuccess && data.rows.length === 0) {
        return <h2>No halls</h2>;
    }

    if (!isSuccess || index === -1) {
        return "Loading...";
    }

    return <ChooseHall defaultValue={hall} cinema={cinema} />;
};

const ChooseHall = ({ defaultValue, cinema }) => {
    const [hall, setHall] = useLocalStorage("cinemas/hall", defaultValue);
    const [date, setDate] = useLocalStorage("cinemas/sessions/time", moment());
    const [hallName, setHallName] = useState("");
    const { data, isLoading } = useFindHallQuery({ name: hallName, cinemaId: cinema.id });

    const setHallNameDebounced = debounce((text) => {
        setHallName(text);
    }, 100);

    return (
        <>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-end" }}>
                <div style={{ marginRight: "30px" }}>
                    <p>Choose hall and date:</p>
                    <Select
                        style={{ width: "250px" }}
                        showSearch
                        loading={isLoading}
                        filterOption={false}
                        onSearch={(text) => setHallNameDebounced(text)}
                        value={hall.id}
                        defaultValue={defaultValue.id}
                        onSelect={(value, option) => {
                            setHallName("");
                            setHall({
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
                </div>
                <div>
                    <DatePicker value={date ? moment(date) : null} onChange={(date) => setDate(date)} />
                </div>
            </div>
            <Divider />
            {date ? (
                <SessionsDataView cinema={cinema} hall={hall} date={moment(date).format("YYYY-MM-DD")} />
            ) : (
                <div>Loading...</div>
            )}
        </>
    );
};

export default QueryHall;
