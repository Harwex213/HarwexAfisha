const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        "movie",
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
                unique: "UQ__movie__72E12F1BD940243B",
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
        },
        {
            sequelize,
            tableName: "movie",
            schema: "dbo",
            hasTrigger: true,
            timestamps: false,
            indexes: [
                {
                    name: "movie_pk",
                    unique: true,
                    fields: [{ name: "id" }],
                },
                {
                    name: "UQ__movie__72E12F1BD940243B",
                    unique: true,
                    fields: [{ name: "name" }],
                },
            ],
        }
    );
};
