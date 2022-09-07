const { schemas: getSchemas } = require("../index");
const { map } = require("../../schemas/mapper");
const dataProvider = require("../index").hallProvider;
const { userRoles } = require("../index").constants;

const handler = ({ body }) => dataProvider.find({ ...body });

module.exports = async () => {
    const { hall } = await getSchemas();

    return {
        handler,
        expectedRoles: [userRoles.GUEST, userRoles.USER, userRoles.ADMIN],
        schema: map(hall, ["name", "cinemaId"], ["name", "cinemaId"]),
    };
};
