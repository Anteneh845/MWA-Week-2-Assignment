const express = require("express");
const app = express();
const path = require("path")
const PORT = 4000;

require("./api/config/db-config");
const guitarRoutes = require("./api/routes/guitar.route");
const userRoutes = require("./api/routes/user.route");

app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", guitarRoutes);

app.use(express.static(path.join(__dirname, "public")))
app.use("/node_modules",express.static(path.join(__dirname, "node_modules")))
app.listen(PORT, () => {
    console.log("APp started at " + PORT);
})