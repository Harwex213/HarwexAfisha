const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        "ticket",
        {
            id: {
                autoIncrement: true,
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
            },
            sessionId: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: "session",
                    key: "id",
                },
                unique: "ticket_unique",
            },
            userId: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: "user",
                    key: "id",
                },
            },
            row: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: "ticket_unique",
            },
            position: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: "ticket_unique",
            },
        },
        {
            sequelize,
            tableName: "ticket",
            schema: "dbo",
            timestamps: false,
            indexes: [
                {
                    name: "ticket_pk",
                    unique: true,
                    fields: [{ name: "id" }],
                },
                {
                    name: "ticket_unique",
                    unique: true,
                    fields: [{ name: "sessionId" }, { name: "row" }, { name: "position" }],
                },
            ],
        }
    );
};
