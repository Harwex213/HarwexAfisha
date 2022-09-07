const nodemailer = require("nodemailer");
const config = require("config").get("mailTransporter");

const transporter = nodemailer.createTransport({
    ...config,
});

module.exports = transporter;
