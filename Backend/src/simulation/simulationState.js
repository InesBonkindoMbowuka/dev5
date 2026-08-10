const simulationState = {
    running: false,
    currentTick: 0,
    maxTicks: 30,
    interval: null,
    startTime: null,
    speed: 1,
    phase: "observation",
    accusations: 0,
    wrongAccusations: 0,
    gameOver: false,
    won: false,
    accusedPedestrianUid: null,
};

module.exports = simulationState;