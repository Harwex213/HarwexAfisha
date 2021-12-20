const databaseTypes = {
    readWrite: "readWrite",
    read: "read",
};

const userRoles = {
    guest: "GUEST",
    user: "USER",
    manager: "MANAGER",
    admin: "ADMIN",
};

const baseConfig = {
    connectionTimeout: 1000,
    requestTimeout: 1000,
    options: {
        trustServerCertificate: true,
    },
};

module.exports = {
    databaseTypes,
    userRoles,
    baseConfig,
};
