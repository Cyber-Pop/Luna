const { Schema, model } = require("mongoose");
const user = Schema({
    userID: String,
    shells: {
        default: 10,
        type: Number
    },
    level: {
        default: 1,
        type: Number
    },
    water: {
        default: 0,
        type: Number
    },
    food: {
        default: 100,
        type: Number
    },
    energy: {
        default: 100,
        type: Number
    },
    health: {
        default: 10,
        type: Number
    }
});

module.exports = model("User", user);