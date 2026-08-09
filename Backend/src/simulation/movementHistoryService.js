const MovementHistory = require("../models/MovementHistory");

class MovementHistoryService {
	async savePosition(
		pedestrian,
		tick,
		behavior,
		description
	) {
		await MovementHistory.create({
			pedestrianUid: pedestrian.uid,

			tick: tick,

			position: {
				x: pedestrian.position.x,
				y: pedestrian.position.y,
			},

			behavior,
			description,
		});
	}
}

module.exports = new MovementHistoryService();