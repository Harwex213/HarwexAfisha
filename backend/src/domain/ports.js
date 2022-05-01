const genericProvider = require("../data-access/data-providers/genericProvider");
const fs = require("fs/promises");
const getSchemas = require("./schemas/schemas");
const { userRoles } = require("../constants");
const path = require("path");
const getUserContext = require("./internal/userContext");
const { mapCreate, mapDelete } = require("./schemas/mapper");
const { throwNotFound } = require("./exceptions");

const SERVICE_FILES_EXCLUDE = ["index.js"];
const PATH_TO_SERVICES = "./src/domain/services";
const RELATIVE_PATH_TO_SERVICE = "./services/";
let ports = null;

const createHandler =
    ({ expectedRoles, handler }) =>
    async ({ ...args }) => {
        const { accessToken } = args;
        const userContext = await getUserContext(accessToken, expectedRoles);

        return handler({ ...args, userContext });
    };

const addDefaultPorts = async (ports) => {
    const schemas = await getSchemas();

    for (const [schema, schemaValue] of Object.entries(schemas)) {
        ports[schema] = {};

        ports[schema].create = {
            schema: mapCreate(schemaValue),
            handler: createHandler({
                expectedRoles: [userRoles.ADMIN],
                handler: ({ body }) => genericProvider.create({ modelName: schema, instance: body }),
            }),
        };

        ports[schema].update = {
            schema: schemaValue,
            handler: createHandler({
                expectedRoles: [userRoles.ADMIN],
                handler: async ({ body }) => {
                    const [rowsAffected] = await genericProvider.update({
                        modelName: schema,
                        instance: body,
                    });
                    if (rowsAffected === 0) {
                        throwNotFound();
                    }

                    return {
                        message: "Success",
                    };
                },
            }),
        };

        ports[schema].delete = {
            schema: mapDelete(schemaValue),
            handler: createHandler({
                expectedRoles: [userRoles.ADMIN],
                handler: async ({ body }) => {
                    const rowsDeleted = await genericProvider.delete({ modelName: schema, id: body.id });
                    if (rowsDeleted === 0) {
                        throwNotFound();
                    }

                    return {
                        message: "Success",
                    };
                },
            }),
        };
    }
};

const addServiceExports = async (ports) => {
    const services = await fs.readdir(PATH_TO_SERVICES);

    for (const service of services) {
        if (SERVICE_FILES_EXCLUDE.includes(service)) {
            continue;
        }

        const methods = await fs.readdir(PATH_TO_SERVICES + "/" + service);
        const servicePorts = {};

        for (const method of methods) {
            const exportFunc = require(RELATIVE_PATH_TO_SERVICE + service + "/" + method);
            if (typeof exportFunc !== "function") {
                throw new Error(
                    `Was received not a export func for generation method ${method} of service - ${service}`
                );
            }

            const { handler, schema, expectedRoles } = await exportFunc();
            if (!schema || !handler || expectedRoles?.length < 1) {
                throw new Error(`Bad information for port generation of service - ${service}`);
            }

            servicePorts[path.basename(method, ".js")] = {
                schema: schema,
                handler: createHandler({ expectedRoles, handler }),
            };
        }

        ports[service] = {
            ...ports[service],
            ...servicePorts,
        };
    }
};

module.exports = async () => {
    if (ports) {
        return ports;
    }

    ports = {};
    await addDefaultPorts(ports);
    await addServiceExports(ports);
    return ports;
};
