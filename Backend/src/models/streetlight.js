const mongoose = require("mongoose");

const streetlightSchema = new mongoose.Schema({
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
    },

    radius: {
        type: Number,
        required: true
    },

    active: {
        type: Boolean,
        default: true
    },

    direction: {
        type: Number,
        default: 0
    },

    energyUsage: {
        type: Number,
        default: 0
    }

}, {
    timestamps: true
});


module.exports = mongoose.model("Streetlight", streetlightSchema);