const { userRoles } = require("../index").constants;
const fs = require("fs");
const util = require("util");
const { pipeline } = require("stream");
const path = require("path");
const pump = util.promisify(pipeline);
const jimp = require("jimp");

const schema = {};

const handler = async ({ file }) => {
    const filePath = "./static/" + file.fieldname;
    const dirPath = path.dirname(filePath);
    if (!fs.existsSync(dirPath)) {
        await fs.promises.mkdir(dirPath, { recursive: true });
    }

    await pump(file.file, fs.createWriteStream(filePath));

    if (path.extname(filePath) === ".png") {
        const image = await jimp.read(filePath);
        await image.writeAsync(dirPath + path.basename(filePath, ".png") + ".jpg");
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
