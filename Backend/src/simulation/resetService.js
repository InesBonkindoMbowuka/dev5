const Pedestrian = require("../models/Pedestrian");
const Detection = require("../models/Detection");
const simulationState = require("./simulationState");
const Streetlight = require("../models/Streetlight");
const Snapshot = require("../models/SimulationSnapshot");


class ResetService {


    async reset() {

        await Pedestrian.deleteMany({});
        await Streetlight.deleteMany({});
        await Detection.deleteMany({});
        await Snapshot.deleteMany({});


        simulationState.currentTick = 0;
        simulationState.running = false;
        simulationState.startTime = null;


        console.log("Simulation reset");

    }

}


module.exports = new ResetService();