const SimulationSnapshot = require("../models/SimulationSnapshot");
const Pedestrian = require("../models/Pedestrian");
const Detection = require("../models/Detection");


class SnapshotService {


    async saveSnapshot(tick, coverage) {

        const pedestrianCount = await Pedestrian.countDocuments();

        const detectionCount = await Detection.countDocuments();


        const snapshot = new SimulationSnapshot({

            tick,

            pedestrianCount,

            detectionCount,

            coveragePercentage: coverage.coveragePercentage,

            blindSpotPercentage: coverage.blindSpotPercentage

        });


        await snapshot.save();


        console.log(
            `Snapshot saved for tick ${tick}`
        );

    }

}


module.exports = new SnapshotService();