const Pedestrian = require("../models/Pedestrian");
const RandomMovement = require("./strategies/randomMovement");
const PatrolMovement = require("./strategies/patrolMovement");
const CircularMovement = require("./strategies/circularMovement");
const movementHistoryService = require("./movementHistoryService");
const simulationState = require("./simulationState");
const BurglarMovement = require("./strategies/burglarMovement");
const MAP_SIZE = 100;

const strategies = {
	random: new RandomMovement(),
	patrol: new PatrolMovement(),
	circular: new CircularMovement(),
	burglar: new BurglarMovement(),
};

class MovementEngine {
	constructor() {
		this.previousBehaviors = new Map();
	}
	async movePedestrians() {
		const pedestrians = await Pedestrian.find();

		for (const pedestrian of pedestrians) {
			const oldX = pedestrian.position.x;
			const oldY = pedestrian.position.y;
			let strategy;

			if (pedestrian.role === "burglar") {
				strategy = strategies.burglar;
			} else {
				strategy = strategies[pedestrian.movementStrategy] || strategies.circular;
			}

			const newPosition = strategy.move(pedestrian.position, pedestrian.speed, simulationState.currentTick);

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
			const behavior = this.getBehavior(pedestrian);
			const previousBehavior = this.previousBehaviors.get(pedestrian.uid);

			let description = behavior.description;

			if (behavior.type === "inside_home" && previousBehavior && previousBehavior.type !== "inside_home") {
				description = `${pedestrian.name} entered ${behavior.home}`;
			}

			if (behavior.type === "walking" && previousBehavior && previousBehavior.type === "inside_home") {
				description = `${pedestrian.name} left ${previousBehavior.home}`;
			}

			await movementHistoryService.savePosition(pedestrian, simulationState.currentTick, behavior.type, description);
			this.previousBehaviors.set(pedestrian.uid, behavior);
		}

		console.log(`Moved ${pedestrians.length} pedestrians`);
	}

	getBehavior(pedestrian) {
		const x = pedestrian.position.x;
		const y = pedestrian.position.y;

		if (x < 25 && y < 25) {
			return {
				type: "inside_home",
				home: "Home 1",
				description: `${pedestrian.name} is inside Home 1`,
			};
		}

		if (x > 75 && y < 25) {
			return {
				type: "inside_home",
				home: "Home 2",
				description: `${pedestrian.name} is inside Home 2`,
			};
		}

		if (x < 25 && y > 75) {
			return {
				type: "inside_home",
				home: "Home 3",
				description: `${pedestrian.name} is inside Home 3`,
			};
		}

		if (x > 75 && y > 75) {
			return {
				type: "inside_home",
				home: "Home 4",
				description: `${pedestrian.name} is inside Home 4`,
			};
		}

		return {
			type: "walking",
			home: null,
			description: `${pedestrian.name} is walking down the street`,
		};
	}
}

module.exports = new MovementEngine();
