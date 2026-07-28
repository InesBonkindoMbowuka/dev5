const mongoose = require("mongoose");

const pedestrianSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
        unique: true
    },

    position: {
        x: {
            type: Number,
            required: true
        },
        y: {
            type: Number,
            required: true
        }
    }
});

module.exports = mongoose.model(
    "Pedestrian",
    pedestrianSchema
);