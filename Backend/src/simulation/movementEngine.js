const Pedestrian = require("../models/Pedestrian");

class MovementEngine {
	async movePedestrians() {
		const pedestrians = await Pedestrian.find();

		for (const pedestrian of pedestrians) {
			const newX = pedestrian.position.x + (Math.floor(Math.random() * 3) - 1);

			const newY = pedestrian.position.y + (Math.floor(Math.random() * 3) - 1);

			pedestrian.position.x = Math.max(0, Math.min(100, newX));

			pedestrian.position.y = Math.max(0, Math.min(100, newY));

			await pedestrian.save();
		}

		console.log(`Moved ${pedestrians.length} pedestrians`);
	}
}

module.exports = new MovementEngine();
