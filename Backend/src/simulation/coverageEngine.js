const Streetlight = require("../models/Streetlight");

class CoverageEngine {
	async calculateCoverage() {
		const streetlights = await Streetlight.find({
			active: true,
		});

		const gridSize = 10;

		let totalCells = gridSize * gridSize;
		let coveredCells = 0;

		for (let x = 0; x < gridSize; x++) {
			for (let y = 0; y < gridSize; y++) {
				const cellX = x * 10;
				const cellY = y * 10;

				const covered = streetlights.some((light) => {
					const distance = Math.sqrt(Math.pow(light.position.x - cellX, 2) + Math.pow(light.position.y - cellY, 2));

					return distance <= light.radius;
				});

				if (covered) {
					coveredCells++;
				}
			}
		}

		const coveragePercentage = (coveredCells / totalCells) * 100;

		const blindSpotPercentage = 100 - coveragePercentage;

		console.log(`Coverage: ${coveragePercentage.toFixed(2)}% | Blind spots: ${blindSpotPercentage.toFixed(2)}%`);

		return {
			coveragePercentage,
			blindSpotPercentage,
		};
	}
}

module.exports = new CoverageEngine();
