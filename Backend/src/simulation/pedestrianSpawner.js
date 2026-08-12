const Pedestrian = require("../models/Pedestrian");
const defaultNames = ["Inès", "Kenza", "Jan", "Soundous", "Moussa", "Filsan", "Khadija", "Chaima", "Lila", "Hajar"];

class PedestrianSpawner {
	constructor() {
		this.maxPedestrians = 10;
	}

	async spawnPedestrians() {
		const currentCount = await Pedestrian.countDocuments();

		const amountToSpawn = this.maxPedestrians - currentCount;

		if (amountToSpawn <= 0) {
			console.log("Maximum pedestrians reached");
			return;
		}

		const burglarIndex = Math.floor(Math.random() * amountToSpawn);

		for (let i = 0; i < amountToSpawn; i++) {
			const isBurglar = i === burglarIndex;
			const pedestrian = new Pedestrian({
				uid: `P${Date.now()}-${i}`,
				name: defaultNames[i],

				position: isBurglar
					? {
							x: 50,
							y: 50,
						}
					: {
							x: Math.floor(Math.random() * 101),
							y: Math.floor(Math.random() * 101),
						},

				speed: isBurglar ? 1 : Math.floor(Math.random() * 2) + 1,

				movementStrategy: "circular",

				role: isBurglar ? "burglar" : "normal",

				totalDistance: 0,
			});

			await pedestrian.save();
		}

		console.log(`Spawned ${amountToSpawn} pedestrians`);

		console.log(`Burglar assigned to pedestrian ${burglarIndex + 1}`);
	}
}

module.exports = new PedestrianSpawner();
