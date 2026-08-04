const SimulationSnapshot = require("../models/SimulationSnapshot");
const Pedestrian = require("../models/Pedestrian");
const Detection = require("../models/Detection");

class SnapshotService {
	async saveSnapshot(tick, coverage, detectionsCreated) {
		const pedestrianCount = await Pedestrian.countDocuments();

		const totalDetectionCount = await Detection.countDocuments();

		const snapshot = new SimulationSnapshot({
			tick,

			pedestrianCount,

			detectionCount: detectionsCreated,

			totalDetectionCount,

			coveragePercentage: coverage.coveragePercentage,

			blindSpotPercentage: coverage.blindSpotPercentage,
		});

		await snapshot.save();

		console.log(`Snapshot saved for tick ${tick}`);
	}
}

module.exports = new SnapshotService();
