const genericProvider = require("../data-access/data-providers/genericProvider");
const fs = require("fs/promises");
const getSchemas = require("./schemas/schemas");
const { userRoles } = require("../constants");
const path = require("path");
const getUserContext = require("./internal/userContext");
const { mapCreate, mapDelete } = require("./schemas/mapper");

const SERVICE_PREFIX_START_INDEX = -7;
const PATH_TO_SERVICES = "./src/domain/services";
const RELATIVE_PATH_TO_SERVICE = "./services/";
let ports = null;

const addDefaultPorts = async (ports) => {
    const schemas = await getSchemas();

    for (const [schema, schemaValue] of Object.entries(schemas)) {
        ports[schema] = {};

        ports[schema].create = {
            schema: mapCreate(schemaValue),
            handler: async ({ body, accessToken }) => {
                await getUserContext(accessToken, [userRoles.ADMIN]);
                return genericProvider.create({ modelName: schema, instance: body });
            },
        };

        ports[schema].update = {
            schema: schemaValue,
            handler: async ({ body, accessToken }) => {
                await getUserContext(accessToken, [userRoles.ADMIN]);
                return genericProvider.update({ modelName: schema, instance: body });
            },
        };

        ports[schema].delete = {
            schema: mapDelete(schemaValue),
            handler: async ({ body, accessToken }) => {
                await getUserContext(accessToken, [userRoles.ADMIN]);
                return genericProvider.delete({ modelName: schema, id: body.id });
            },
        };
    }
};

const addServiceExports = async (ports) => {
    const services = await fs.readdir(PATH_TO_SERVICES);

    for (const service of services) {
        const schemaService = path.basename(service, ".js").slice(0, SERVICE_PREFIX_START_INDEX);
        const serviceMethods = require(RELATIVE_PATH_TO_SERVICE + service);
        if (!serviceMethods) {
            continue;
        }

        const servicePorts = {};
        for (const [key, value] of Object.entries(serviceMethods)) {
            if (!value || !value.schema || !value.handler || value.expectedRoles?.length < 1) {
                throw new Error(`Bad information for port generation of service - ${key}`);
            }

            servicePorts[key] = {
                schema: value.schema,
                handler: async ({ ...args }) => {
                    const { accessToken } = args;
                    const userContext = await getUserContext(accessToken, value.expectedRoles);

                    return value.handler({ ...args, userContext });
                },
            };
        }

        ports[schemaService] = {
            ...ports[schemaService],
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
