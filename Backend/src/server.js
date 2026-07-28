require("dotenv").config();

const app = require("./app");
const connectDatabase = require("./config/database");
const testRoutes = require("./routes/test");
const PORT = process.env.PORT || 3000;

connectDatabase();
app.use("/test", testRoutes);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



