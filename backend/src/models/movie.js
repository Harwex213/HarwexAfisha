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
                unique: "UQ__movie__72E12F1B94B93258",
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            year: {
                type: DataTypes.SMALLINT,
                allowNull: false,
            },
            slogan: {
                type: DataTypes.STRING(256),
                allowNull: true,
            },
            country: {
                type: DataTypes.STRING(256),
                allowNull: true,
            },
            age: {
                type: DataTypes.SMALLINT,
                allowNull: false,
            },
            director: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },
            duration: {
                type: DataTypes.SMALLINT,
                allowNull: false,
            },
            kinopoiskId: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            trailerUrl: {
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
                    name: "UQ__movie__72E12F1B94B93258",
                    unique: true,
                    fields: [{ name: "name" }],
                },
            ],
        }
    );
};
