const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        "city",
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
                unique: "city_name_unique",
            },
        },
        {
            sequelize,
            tableName: "city",
            schema: "dbo",
            timestamps: false,
            indexes: [
                {
                    name: "city_name_unique",
                    unique: true,
                    fields: [{ name: "name" }],
                },
                {
                    name: "city_pk",
                    unique: true,
                    fields: [{ name: "id" }],
                },
            ],
        }
    );
};
