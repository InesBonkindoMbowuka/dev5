const tickManager = require("../simulation/tickManager");
const simulationState = require("../simulation/simulationState");
const resetService = require("../simulation/resetService");

class SimulationController {
	async start(req, res) {
		const { userUid } = req.body;

		simulationState.userUid = userUid;

		await tickManager.start();

		res.json({
			message: "Simulation started",
			running: simulationState.running,
            userUid: simulationState.userUid
		});
	}

	stop(req, res) {
		tickManager.stop();

		res.json({
			message: "Simulation stopped",
			running: simulationState.running,
		});
	}

	async reset(req, res) {
		tickManager.stop();

		await resetService.reset();

		res.json({
			message: "Simulation reset",
			tick: simulationState.currentTick,
		});
	}

	status(req, res) {
		res.json({
			running: simulationState.running,
			currentTick: simulationState.currentTick,
			startTime: simulationState.startTime,
			speed: simulationState.speed,
		});
	}
}

module.exports = new SimulationController();
