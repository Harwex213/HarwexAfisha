const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        "cinemaMovie",
        {
            id: {
                autoIncrement: true,
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
            },
            movieId: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: "movie",
                    key: "id",
                },
                unique: "cinemaMovie_unique",
            },
            cinemaId: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: "cinema",
                    key: "id",
                },
                unique: "cinemaMovie_unique",
            },
            start: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            finish: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
        },
        {
            sequelize,
            tableName: "cinemaMovie",
            schema: "dbo",
            timestamps: false,
            indexes: [
                {
                    name: "cinemaMovie_pk",
                    unique: true,
                    fields: [{ name: "id" }],
                },
                {
                    name: "cinemaMovie_unique",
                    unique: true,
                    fields: [{ name: "movieId" }, { name: "cinemaId" }],
                },
            ],
        }
    );
};
