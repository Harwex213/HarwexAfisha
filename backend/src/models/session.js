const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        "session",
        {
            id: {
                autoIncrement: true,
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
            },
            cinemaMovieId: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: "cinemaMovie",
                    key: "id",
                },
            },
            hallId: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: "hall",
                    key: "id",
                },
            },
            time: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            price: {
                type: DataTypes.DECIMAL(10, 4),
                allowNull: false,
            },
            ticketsOrdered: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            tableName: "session",
            schema: "dbo",
            hasTrigger: true,
            timestamps: false,
            indexes: [
                {
                    name: "session_pk",
                    unique: true,
                    fields: [{ name: "id" }],
                },
            ],
        }
    );
};
