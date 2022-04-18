const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        "userRole",
        {
            id: {
                autoIncrement: true,
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING(50),
                allowNull: false,
                unique: "userRole_name_unique",
            },
        },
        {
            sequelize,
            tableName: "userRole",
            schema: "dbo",
            timestamps: false,
            indexes: [
                {
                    name: "userRole_name_unique",
                    unique: true,
                    fields: [{ name: "name" }],
                },
                {
                    name: "userRole_pk",
                    unique: true,
                    fields: [{ name: "id" }],
                },
            ],
        }
    );
};
