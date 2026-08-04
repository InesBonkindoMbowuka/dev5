const simulationState = require("./simulationState");
const movementEngine = require("./movementEngine");
const detectionEngine = require("./detectionEngine");

class TickManager {

    start() {

        if (simulationState.running) {
            return;
        }

        simulationState.running = true;

        simulationState.interval = setInterval(async () => {

            simulationState.currentTick++;
            await movementEngine.movePedestrians();
            await detectionEngine.checkDetections();

            console.log(`Tick ${simulationState.currentTick}`);

        }, 1000);

    }


    stop() {

        clearInterval(simulationState.interval);

        simulationState.running = false;

        simulationState.interval = null;

    }

}

module.exports = new TickManager();