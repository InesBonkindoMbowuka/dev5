const express = require("express");

const pedestrianRoutes = require("./routes/pedestrianRoutes");
const streetlightRoutes = require("./routes/streetlightRoutes");
const detectionRoutes = require("./routes/detectionRoutes");
const simulationRoutes = require("./routes/simulationRoutes");
const snapshotRoutes = require("./routes/snapshotRoutes");

const app = express();

app.use(express.json());

app.use("/api/pedestrians", pedestrianRoutes);
app.use("/api/streetlights", streetlightRoutes);
app.use("/api/detections", detectionRoutes);
app.use("/api/simulation", simulationRoutes);
app.use("/api/snapshots", snapshotRoutes);

module.exports = app;
