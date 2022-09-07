const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        "refreshToken",
        {
            id: {
                type: DataTypes.STRING(256),
                allowNull: false,
                primaryKey: true,
            },
        },
        {
            sequelize,
            tableName: "refreshToken",
            schema: "dbo",
            timestamps: false,
            indexes: [
                {
                    name: "PK__refreshT__3213E83F5D1B3897",
                    unique: true,
                    fields: [{ name: "id" }],
                },
            ],
        }
    );
};
