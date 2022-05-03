const { userRoles } = require("../index").constants;
const fs = require("fs");
const util = require("util");
const { pipeline } = require("stream");
const pump = util.promisify(pipeline);

const schema = {};

const handler = async ({ parts }) => {
    for await (const part of parts) {
        if (part.file) {
            await pump(part.file, fs.createWriteStream(part.fieldname));
        } else {
            console.log(part);
        }
    }

    return {
        message: "Success",
    };
};

module.exports = async () => {
    return {
        handler,
        expectedRoles: [userRoles.ADMIN],
        schema,
    };
};
