import { useGetSchemaQuery } from "../store/api/schema";

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const useGetColumnsFromSchema = ({ schemaName }) => {
    const { data: schema, isLoading, isError, isSuccess } = useGetSchemaQuery({ schemaName });

    if (isSuccess) {
        return {
            data: Object.keys(schema.properties).map((property) => ({
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
