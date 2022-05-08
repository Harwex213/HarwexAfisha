const { map } = require("../../schemas/mapper");
const dataProvider = require("../index").cinemaProvider;
const { userRoles } = require("../index").constants;
const getSchemas = require("../index").schemas;

const handler = ({ body }) => dataProvider.find({ ...body });

module.exports = async () => {
    const { cinema } = await getSchemas();

    return {
        handler,
        expectedRoles: [userRoles.GUEST, userRoles.USER, userRoles.ADMIN],
        schema: map(cinema, ["name", "cityId"], ["name", "cityId"]),
    };
};
