const mongoose = require("mongoose");

const detectionSchema = new mongoose.Schema({
	pedestrianUid: {
		type: String,
		required: true,
	},

	streetlightUid: {
		type: String,
		required: true,
	},

	position: {
		x: {
			type: Number,
			required: true,
		},
		y: {
			type: Number,
			required: true,
		},
	},

	timestamp: {
		type: Date,
		default: Date.now,
	},
	tick: {
		type: Number,
		required: true,
	},
});

module.exports = mongoose.model("Detection", detectionSchema);
