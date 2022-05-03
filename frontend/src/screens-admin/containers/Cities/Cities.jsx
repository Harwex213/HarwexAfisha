import React from "react";
import { Table } from "antd";
import { useGetQuery } from "../../../store/api/generic";
import useGetColumnsFromSchema from "../../../hooks/useGetColumnsFromSchema";
import useLocalStorage from "../../../hooks/useLocalStorageState";

const Cities = () => {
    const [page, setPage] = useLocalStorage("cityPage", 1);
    const { data: columns, isLoading: isSchemaLoading } = useGetColumnsFromSchema({ schemaName: "city" });
    const { data: cities, isLoading: isCitiesLoading } = useGetQuery({ model: "city", page: page - 1 });

    if (isSchemaLoading || isCitiesLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Table
                columns={columns}
                dataSource={cities.rows}
                rowKey="id"
                pagination={{
                    current: page,
                    onChange: (page) => setPage(page),
                    pageSize: 15,
                    showSizeChanger: false,
                    total: cities.count,
                    position: ["topLeft", "bottomLeft"],
                }}
            />
        </div>
    );
};

export default Cities;
