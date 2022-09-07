module.exports.mapCreate = (schema) => {
    const newSchema = JSON.parse(JSON.stringify(schema));
    delete newSchema.properties.id;
    const idIndex = newSchema.required.findIndex((require) => require === "id");
    if (idIndex !== -1) {
        newSchema.required.splice(idIndex, 1);
    }

    return newSchema;
};

module.exports.mapDelete = (schema) => {
    return {
        type: "object",
        properties: {
            id: schema.properties.id,
        },
        required: ["id"],
    };
};

module.exports.map = (schema, properties, required) => {
    const newSchema = {
        type: "object",
        properties: {},
        required,
    };

    let mapped = 0;
    for (const property of properties) {
        if (Object.hasOwn(schema.properties, property)) {
            mapped++;
            newSchema.properties[property] = schema.properties[property];
        }
    }
    if (mapped !== properties.length) {
        const message = `Error while attempted to map ${schema} with properties ${properties.join(", ")}`;
        throw new Error(message);
    }

    const requiredFiltered = [...schema.required].filter((require) => required.includes(require));
    if (requiredFiltered.length !== required.length) {
        const message = `Error while attempted to map ${schema} with required ${required.join(", ")}`;
        throw new Error(message);
    }

    return newSchema;
};
