const genericProvider = require("../data-access/data-providers/genericProvider");
const getSchemasContext = require("../schemas/ajv");
const fs = require("fs/promises");
const config = require("config");
const jwt = require("jsonwebtoken");
const { userRoles } = require("../constants");
const { throwForbidden } = require("./exceptions");
const path = require("path");

let ports = {};

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

    if (expectedRoles.includes(userContext.role) === false) {
        throwForbidden();
    }
    return userContext;
};

module.exports = async () => {
    const { schemas, validateSchema } = await getSchemasContext();

    for (const schema of Object.keys(schemas)) {
        ports[schema] = {};

        ports[schema].create = async ({ body, accessToken }) => {
            await getUserContext(accessToken, [userRoles.ADMIN]);
            validateSchema(schema, body);
            delete body.id;

            return genericProvider.create({ modelName: schema, instance: body });
        };

        ports[schema].update = async ({ body, accessToken }) => {
            await getUserContext(accessToken, [userRoles.ADMIN]);
            validateSchema(schema, body);

            return genericProvider.update({ modelName: schema, instance: body });
        };

        ports[schema].delete = async ({ body, accessToken }) => {
            await getUserContext(accessToken, [userRoles.ADMIN]);
            return genericProvider.delete({ modelName: schema, id: body.id });
        };
    }

    const servicePrefixStartIndex = -7;
    const services = await fs.readdir("./src/services");
    for (const service of services) {
        const schemaService = path.basename(service, ".js").slice(0, servicePrefixStartIndex);
        const serviceMethods = require("../services/" + service);
        if (!serviceMethods) {
            continue;
        }

        const servicePorts = {};
        for (const [key, value] of Object.entries(serviceMethods)) {
            servicePorts[key] = async ({ body, accessToken, refreshToken }) => {
                const userContext = await getUserContext(accessToken, value.expectedRoles);
                validateSchema(value.schema, body);

                return value.handler({ body, accessToken, refreshToken, userContext });
            };
        }

        ports[schemaService] = {
            ...ports[schemaService],
            ...servicePorts,
        };
    }
    return ports;
};
