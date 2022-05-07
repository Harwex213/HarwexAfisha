import { useGetSchemaQuery } from "../store/api/schema";

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const useGetColumnsFromSchema = ({ schemaName, toExclude = [] }) => {
    const { data: schema, isLoading, isError, isSuccess } = useGetSchemaQuery({ schemaName });

    if (isSuccess) {
        return {
            data: Object.keys(schema.properties)
                .filter((property) => toExclude.includes(property) === false)
                .map((property) => ({
                    title: capitalizeFirstLetter(property),
                    dataIndex: property,
                    key: property,
                })),
            isLoading,
            isError,
            isSuccess,
        };
    }

    return {
        data: [],
        isLoading,
        isError,
        isSuccess,
    };
};

export default useGetColumnsFromSchema;
