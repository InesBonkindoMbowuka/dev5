const mongoose = require("mongoose");

const behaviorHistorySchema = new mongoose.Schema({

    pedestrianUid: {
        type: String,
        required: true
    },

    tick: {
        type: Number,
        required: true
    },

    behavior: {
        type: String,
        required: true
    },

    timestamp: {
        type: Date,
        default: Date.now
    }

});

module.exports =
    mongoose.models.BehaviorHistory ||
    mongoose.model("BehaviorHistory", behaviorHistorySchema);