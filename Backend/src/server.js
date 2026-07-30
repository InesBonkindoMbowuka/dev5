require("dotenv").config();

const app = require("./app");
const connectDatabase = require("./config/database");
const pedestrianRoutes = require("./routes/pedestrianRoutes");
const streetlightRoutes = require("./routes/streetlightRoutes");


const PORT = process.env.PORT || 3000;

connectDatabase();

app.use("/api/pedestrians", pedestrianRoutes); 
app.use("/api/streetlights", streetlightRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



