const Pedestrian = require("../models/Pedestrian");
const Detection = require("../models/Detection");
const simulationState = require("./simulationState");


class ResetService {


    async reset() {

        await Pedestrian.deleteMany({});

        await Detection.deleteMany({});


        simulationState.currentTick = 0;
        simulationState.running = false;
        simulationState.startTime = null;


        console.log("Simulation reset");

    }

}


module.exports = new ResetService();