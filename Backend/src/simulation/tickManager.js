const simulationState = require("./simulationState");
const movementEngine = require("./movementEngine");
const detectionEngine = require("./detectionEngine");
const coverageEngine = require("./coverageEngine");
const pedestrianSpawner = require("./pedestrianSpawner");
const snapshotService = require("./snapshotService");

class TickManager {
	async start() {
		if (simulationState.running) {
			return;
		}

		await pedestrianSpawner.spawnPedestrians();

		simulationState.running = true;
		simulationState.startTime = new Date();
		console.log("Simulation started");

		simulationState.interval = setInterval(async () => {
			simulationState.currentTick++;
			await movementEngine.movePedestrians();
			const detectionsCreated = await detectionEngine.checkDetections();
			const coverage = await coverageEngine.calculateCoverage();

			await snapshotService.saveSnapshot(simulationState.currentTick, coverage, detectionsCreated);

			console.log(`Tick ${simulationState.currentTick}`);
		}, 1000);
	}

	stop() {
		clearInterval(simulationState.interval);

		simulationState.running = false;

		simulationState.interval = null;

		console.log("Simulation ended");
	}
}

module.exports = new TickManager();
