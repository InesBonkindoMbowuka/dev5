const Pedestrian = require("../models/Pedestrian");
const RandomMovement = require("./strategies/randomMovement");
const PatrolMovement = require("./strategies/patrolMovement");
const CircularMovement = require("./strategies/circularMovement");
const MAP_SIZE = 100;

const strategies = {
	random: new RandomMovement(),
	patrol: new PatrolMovement(),
	circular: new CircularMovement(),
};

class MovementEngine {
	async movePedestrians() {
		const pedestrians = await Pedestrian.find();

		for (const pedestrian of pedestrians) {
			const oldX = pedestrian.position.x;
			const oldY = pedestrian.position.y;
			const strategy = strategies[pedestrian.movementStrategy] || strategies.circular;

			const newPosition = strategy.move(pedestrian.position, pedestrian.speed);

			if (newPosition.x < 0 || newPosition.x > MAP_SIZE) {
				newPosition.x = pedestrian.position.x;
			}

			if (newPosition.y < 0 || newPosition.y > MAP_SIZE) {
				newPosition.y = pedestrian.position.y;
			}

			pedestrian.position.x = newPosition.x;
			pedestrian.position.y = newPosition.y;

			const distance = Math.sqrt(Math.pow(pedestrian.position.x - oldX, 2) + Math.pow(pedestrian.position.y - oldY, 2));

			pedestrian.totalDistance += distance;

			await pedestrian.save();
		}

		console.log(`Moved ${pedestrians.length} pedestrians`);
	}
}

module.exports = new MovementEngine();
