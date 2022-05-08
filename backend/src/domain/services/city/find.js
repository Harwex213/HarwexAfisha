const { schemas: getSchemas } = require("../index");
const { map } = require("../../schemas/mapper");
const dataProvider = require("../index").cityProvider;
const { userRoles } = require("../index").constants;

const handler = ({ body }) => dataProvider.find({ cityName: body.city });

module.exports = async () => {
    const { city } = await getSchemas();

    return {
        handler,
        expectedRoles: [userRoles.GUEST, userRoles.USER, userRoles.ADMIN],
        schema: map(city, ["name"], ["name"]),
    };
};
