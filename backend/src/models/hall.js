const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        "hall",
        {
            id: {
                autoIncrement: true,
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
            },
            cinemaId: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: "cinema",
                    key: "id",
                },
            },
            seatsAmount: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            tableName: "hall",
            schema: "dbo",
            timestamps: false,
            indexes: [
                {
                    name: "hall_pk",
                    unique: true,
                    fields: [{ name: "id" }],
                },
            ],
        }
    );
};
