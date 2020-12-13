const { Schema, model } = require("mongoose");
const guild = Schema({
    guildID: String,
    prefix: {
        default: "luna.",
        type: String
    }
});

module.exports = model("Guild", guild);