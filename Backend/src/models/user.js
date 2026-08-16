const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userUid: {
        type: String,
        required: true,
        unique: true
    },

    wins: {
        type: Number,
        default: 0
    },

    wrongGuesses: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model("User", userSchema);