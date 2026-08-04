const Pedestrian = require("../models/Pedestrian");
const RandomMovement = require("./strategies/randomMovement");
const PatrolMovement = require("./strategies/patrolMovement");
const CircularMovement = require("./strategies/circularMovement");

const strategies = {
	random: new RandomMovement(),
	patrol: new PatrolMovement(),
	circular: new CircularMovement(),
};

class MovementEngine {
	async movePedestrians() {
		const pedestrians = await Pedestrian.find();

		for (const pedestrian of pedestrians) {
			const strategy = strategies[pedestrian.movementStrategy] || strategies.random;

			const newPosition = strategy.move(pedestrian.position);

			pedestrian.position.x = Math.max(0, Math.min(100, newPosition.x));

			pedestrian.position.y = Math.max(0, Math.min(100, newPosition.y));

			await pedestrian.save();
		}

		console.log(`Moved ${pedestrians.length} pedestrians`);
	}
}

module.exports = new MovementEngine();
