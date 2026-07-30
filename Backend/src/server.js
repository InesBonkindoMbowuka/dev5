require("dotenv").config();

const app = require("./app");
const connectDatabase = require("./config/database");
const pedestrianRoutes = require("./routes/pedestrianRoutes");


const PORT = process.env.PORT || 3000;

connectDatabase();

app.use("/api/pedestrians", pedestrianRoutes); 

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



