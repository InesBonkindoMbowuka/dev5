require("dotenv").config();

const app = require("./app");
const connectDatabase = require("./config/database");
const pedestrianRoutes = require("./routes/pedestrianRoutes");
const streetlightRoutes = require("./routes/streetlightRoutes");
const detectionRoutes = require("./routes/detectionRoutes");
const tickManager = require("./simulation/tickManager");
const simulationRoutes = require("./routes/simulationRoutes");


const PORT = process.env.PORT || 3000;

connectDatabase();

app.use("/api/pedestrians", pedestrianRoutes); 
app.use("/api/streetlights", streetlightRoutes);
app.use("/api/detections", detectionRoutes);
app.use("/api/simulation", simulationRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    const tickManager = require("./simulation/tickManager");
});



