const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        "cinema",
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
            },
            about: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            cityId: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: "city",
                    key: "id",
                },
            },
        },
        {
            sequelize,
            tableName: "cinema",
            schema: "dbo",
            hasTrigger: true,
            timestamps: false,
            indexes: [
                {
                    name: "cinema_pk",
                    unique: true,
                    fields: [{ name: "id" }],
                },
            ],
        }
    );
};
