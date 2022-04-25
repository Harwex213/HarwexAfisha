const genericProvider = require("../data-access/data-providers/genericProvider");
const getSchemasContext = require("./schemas/ajv");
const fs = require("fs/promises");
const config = require("config");
const jwt = require("jsonwebtoken");
const { userRoles } = require("../constants");
const { throwForbidden } = require("./exceptions");
const path = require("path");

const pathToServices = "./src/domain/services";
const relativePathToService = "./services/";

let ports = null;

const authenticate = async (accessToken) => {
    try {
        const decoded = jwt.verify(accessToken, config.get("secrets.accessToken"), {
            complete: true,
        });
        return decoded.payload;
    } catch (e) {
        return {};
    }
};

const authorize = async (userId) => {
    if (!userId) {
        return userRoles.GUEST;
    }

    const user = await genericProvider.getById({ modelName: "user", id: userId });
    if (!user) {
        return userRoles.GUEST;
    }

    const userRole = await genericProvider.getById({ modelName: "userRole", id: user?.roleId });
    return userRole.name;
};

const getUserContext = async (accessToken, expectedRoles) => {
    const userContext = await authenticate(accessToken);
    userContext.role = await authorize(userContext.id);

    if (expectedRoles.includes(userContext.role.toUpperCase()) === false) {
        throwForbidden();
    }
    return userContext;
};

module.exports = async () => {
    if (ports) {
        return ports;
    }

    const { schemas, validateSchema } = await getSchemasContext();
    ports = {};

    for (const [schema, schemaValue] of Object.entries(schemas)) {
        ports[schema] = {};

        ports[schema].create = {
            schema: schemaValue,
            handler: async ({ body, accessToken }) => {
                await getUserContext(accessToken, [userRoles.ADMIN]);
                validateSchema(schema, body);
                delete body.id;

                return genericProvider.create({ modelName: schema, instance: body });
            },
        };

        ports[schema].update = {
            schema: schemaValue,
            handler: async ({ body, accessToken }) => {
                await getUserContext(accessToken, [userRoles.ADMIN]);
                validateSchema(schema, body);

                return genericProvider.update({ modelName: schema, instance: body });
            },
        };

        ports[schema].delete = {
            schema: schemaValue,
            handler: async ({ body, accessToken }) => {
                await getUserContext(accessToken, [userRoles.ADMIN]);
                return genericProvider.delete({ modelName: schema, id: body.id });
            },
        };
    }

    const servicePrefixStartIndex = -7;
    const services = await fs.readdir(pathToServices);
    for (const service of services) {
        const schemaService = path.basename(service, ".js").slice(0, servicePrefixStartIndex);
        const serviceMethods = require(relativePathToService + service);
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
                    const { body, accessToken } = args;
                    const userContext = await getUserContext(accessToken, value.expectedRoles);
                    validateSchema(value.schema, body);

                    return value.handler({ ...args, userContext });
                },
            };
        }

        ports[schemaService] = {
            ...ports[schemaService],
            ...servicePorts,
        };
    }
    return ports;
};
