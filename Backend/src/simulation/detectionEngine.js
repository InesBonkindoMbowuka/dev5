const Pedestrian = require("../models/Pedestrian");
const Streetlight = require("../models/Streetlight");
const Detection = require("../models/Detection");
const detectionState = require("./detectionState");
const simulationState = require("./simulationState");

class DetectionEngine {
	async checkDetections() {
		const pedestrians = await Pedestrian.find();
		const streetlights = await Streetlight.find();

		let detections = 0;

		for (const pedestrian of pedestrians) {
			for (const streetlight of streetlights) {
				const dx = pedestrian.position.x - streetlight.position.x;
				const dy = pedestrian.position.y - streetlight.position.y;

				const distance = Math.sqrt(dx * dx + dy * dy);
				const key = `${pedestrian.uid}-${streetlight.uid}`;

				if (streetlight.active && distance <= streetlight.radius) {
					if (!detectionState.activeDetections.has(key)) {
						await Detection.create({
							pedestrianUid: pedestrian.uid,
							streetlightUid: streetlight.uid,
                            tick: simulationState.currentTick,
							position: {
								x: pedestrian.position.x,
								y: pedestrian.position.y,
							},
						});

						detectionState.activeDetections.add(key);
						detections++;
					}
				} else {
					detectionState.activeDetections.delete(key);
				}
			}
		}

		console.log(`Created ${detections} detections`);
        return detections;
	}
}

module.exports = new DetectionEngine();
