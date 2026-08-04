const mongoose = require("mongoose");

const simulationSnapshotSchema = new mongoose.Schema({
	tick: {
		type: Number,
		required: true,
	},

	pedestrianCount: {
		type: Number,
		required: true,
	},

	detectionCount: {
		type: Number,
		required: true,
	},

	totalDetectionCount: {
		type: Number,
		default: 0,
	},

	coveragePercentage: {
		type: Number,
		required: true,
	},

	createdAt: {
		type: Date,
		default: Date.now,
	},

	blindSpotPercentage: {
		type: Number,
		required: true,
	},
});

module.exports = mongoose.model("SimulationSnapshot", simulationSnapshotSchema);
