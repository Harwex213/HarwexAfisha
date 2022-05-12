import { useGetSchemaQuery } from "../store/api/schema";
import capitalizeFirstLetter from "../helpers/capitalizeFirstLetter";

const useGetColumnsFromSchema = ({ schemaName, toExclude = [], specialRender = {} }) => {
    const { data: schema, isLoading, isError, isSuccess } = useGetSchemaQuery({ schemaName });

    if (isSuccess) {
        return {
            data: Object.keys(schema.properties)
                .filter((property) => toExclude.includes(property) === false)
                .map((property) => {
                    const column = {
                        title: capitalizeFirstLetter(property),
                        dataIndex: property,
                        key: property,
                    };
                    const render = specialRender[property];
                    if (render) {
                        column.render = render;
                    }
                    return column;
                }),
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
