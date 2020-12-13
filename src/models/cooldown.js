const { Schema, model } = require("mongoose");
const cooldown = Schema({
    userID: String,
    type: String,
    created: Number
});

module.exports = model("Cooldown", cooldown);