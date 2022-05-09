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
                    name: "PK__refreshT__CA90DA7B10F87C71",
                    unique: true,
                    fields: [{ name: "id" }],
                },
            ],
        }
    );
};
