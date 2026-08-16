const Pedestrian = require("../models/Pedestrian");
const simulationState = require("../simulation/simulationState");
const tickManager = require("../simulation/tickManager");
const User = require("../models/User");

class InvestigationController {
	async accuse(req, res) {
		try {
			const { pedestrianUid, userUid } = req.body;

			if (!pedestrianUid) {
				return res.status(400).json({
					error: "Pedestrian UID is required",
				});
			}

			if (!userUid) {
				return res.status(400).json({
					error: "User UID is required",
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
			const user = await User.findOne({ userUid });
			
            if (!user) {
				return res.status(404).json({
					error: "User not found",
				});
			}

			if (correct) {
				user.wins += 1;
			} else {
				user.wrongGuesses += 1;
			}

			await user.save();

			simulationState.gameOver = correct;
			simulationState.won = correct;
			simulationState.phase = correct ? "won" : "investigating";
			simulationState.accusedPedestrianUid = pedestrianUid;

			if (correct) {
				tickManager.stop();
			}

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
