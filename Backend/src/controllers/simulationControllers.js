const tickManager = require("../simulation/tickManager");
const simulationState = require("../simulation/simulationState");


class SimulationController {

    start(req, res) {

        tickManager.start();

        res.json({
            message: "Simulation started",
            running: simulationState.running
        });

    }


    stop(req, res) {

        tickManager.stop();

        res.json({
            message: "Simulation stopped",
            running: simulationState.running
        });

    }


    reset(req, res) {

        tickManager.stop();

        simulationState.currentTick = 0;

        res.json({
            message: "Simulation reset",
            tick: simulationState.currentTick
        });

    }


    status(req, res) {

        res.json({
            running: simulationState.running,
            currentTick: simulationState.currentTick
        });

    }

}


module.exports = new SimulationController();