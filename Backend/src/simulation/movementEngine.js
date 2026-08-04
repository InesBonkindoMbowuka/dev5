const Pedestrian = require("../models/Pedestrian");

class MovementEngine {

    async movePedestrians() {

        const pedestrians = await Pedestrian.find();

        for (const pedestrian of pedestrians) {

            pedestrian.position.x += Math.floor(Math.random() * 3) - 1;
            pedestrian.position.y += Math.floor(Math.random() * 3) - 1;

            await pedestrian.save();
        }

        console.log(`Moved ${pedestrians.length} pedestrians`);

    }

}

module.exports = new MovementEngine();