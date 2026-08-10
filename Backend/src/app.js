const express = require("express");
const cors = require("cors");

const pedestrianRoutes = require("./routes/pedestrianRoutes");
const streetlightRoutes = require("./routes/streetlightRoutes");
const detectionRoutes = require("./routes/detectionRoutes");
const simulationRoutes = require("./routes/simulationRoutes");
const snapshotRoutes = require("./routes/snapshotRoutes");
const movementHistoryRoutes = require("./routes/movementHistoryRoutes");
const investigationRoutes = require("./routes/investigationRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/pedestrians", pedestrianRoutes);
app.use("/api/streetlights", streetlightRoutes);
app.use("/api/detections", detectionRoutes);
app.use("/api/simulation", simulationRoutes);
app.use("/api/snapshots", snapshotRoutes);
app.use("/api/movement-history", movementHistoryRoutes);
app.use("/api/investigation", investigationRoutes);

module.exports = app;
