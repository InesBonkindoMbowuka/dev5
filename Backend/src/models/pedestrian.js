const mongoose = require("mongoose");

const pedestrianSchema = new mongoose.Schema({
	uid: {
		type: String,
		required: true,
		unique: true,
	},

	name: {
		type: String,
		default: "Unknown",
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

	speed: {
		type: Number,
		default: 1,
	},

	movementStrategy: {
		type: String,
		default: "circular",
	},

	role: {
		type: String,
		enum: ["normal", "burglar"],
		default: "normal",
	},

	totalDistance: {
		type: Number,
		default: 0,
	},
	currentBehavior: {
		type: String,
		default: "walking",
	},

	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("Pedestrian", pedestrianSchema);
