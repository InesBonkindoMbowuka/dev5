const MovementHistory = require("../models/movementHistory.js");


class MovementHistoryService {

    async savePosition(pedestrian, tick) {

        await MovementHistory.create({

            pedestrianUid: pedestrian.uid,

            tick: tick,

            position: {
                x: pedestrian.position.x,
                y: pedestrian.position.y
            }

        });

    }

}


module.exports = new MovementHistoryService();