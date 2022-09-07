module.exports.exclude = {
    "index.js": "all",
    auth: ["_login"],
    ticket: ["create", "update", "delete"],
    refreshToken: "all",
    user: ["getById"],
};
