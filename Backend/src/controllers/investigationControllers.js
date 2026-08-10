const Pedestrian = require("../models/Pedestrian");
const simulationState = require("../simulation/simulationState");

class InvestigationController {
	async accuse(req, res) {
		try {
			const { pedestrianUid } = req.body;

			if (!pedestrianUid) {
				return res.status(400).json({
					error: "Pedestrian UID is required",
				});
			}

			if (!simulationState.running) {
				return res.status(400).json({
					error: "No simulation is currently running",
				});
			}

			if (simulationState.gameOver) {
				return res.status(400).json({
					error: "The game is already over",
				});
			}

			const pedestrian = await Pedestrian.findOne({
				uid: pedestrianUid,
			});

			if (!pedestrian) {
				return res.status(404).json({
					error: "Pedestrian not found",
				});
			}

			const correct = pedestrian.role === "burglar";
			simulationState.gameOver = correct;
			simulationState.won = correct;
			simulationState.phase = correct ? "won" : "investigating";
			simulationState.accusedPedestrianUid = pedestrianUid;

			res.json({
				correct,
				name: pedestrian.name,
				phase: simulationState.phase,
				gameOver: simulationState.gameOver,
				message: correct ? `Correct! ${pedestrian.name} was the burglar.` : `Wrong! ${pedestrian.name} was not the burglar.`,
			});
		} catch (error) {
			res.status(500).json({
				error: error.message,
			});
		}
	}
}

module.exports = new InvestigationController();
