const express = require("express")
const app = express();
const path = require("path");
require("./api/data/db");
// require("./api/data/db-connection").open();
const gameRoutes = require("./api/routes/games.route");
const userRoutes = require("./api/routes/user.route");

app.use(express.json());
app.set("port", 3000);
app.use("/api", gameRoutes);
app.use("/api", userRoutes);


app.use("/node_modules", express.static(path.join(__dirname, "node_modules")))
app.use(express.static(path.join(__dirname, "public")));

app.listen(app.get("port"), () => {
    console.log(`App started at ${app.get("port")}`)
})
