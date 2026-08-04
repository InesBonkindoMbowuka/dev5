const mongoose = require("mongoose");


const movementHistorySchema = new mongoose.Schema({

    pedestrianUid: {
        type: String,
        required: true
    },

    tick: {
        type: Number,
        required: true
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
    },

    timestamp: {
        type: Date,
        default: Date.now
    }

});


module.exports = mongoose.model(
    "MovementHistory",
    movementHistorySchema
);