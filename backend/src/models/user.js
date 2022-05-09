const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        "user",
        {
            id: {
                autoIncrement: true,
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
            },
            username: {
                type: DataTypes.STRING(50),
                allowNull: false,
                unique: "user_username_unique",
            },
            password: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            firstName: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            lastName: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            patronymic: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },
            roleId: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: "userRole",
                    key: "id",
                },
            },
        },
        {
            sequelize,
            tableName: "user",
            schema: "dbo",
            hasTrigger: true,
            timestamps: false,
            indexes: [
                {
                    name: "user_pk",
                    unique: true,
                    fields: [{ name: "id" }],
                },
                {
                    name: "user_username_unique",
                    unique: true,
                    fields: [{ name: "username" }],
                },
            ],
        }
    );
};
