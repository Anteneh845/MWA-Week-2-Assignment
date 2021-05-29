const mongoose = require("mongoose");
const DB_NAME = "meanGamesGeo";
const DB_URL = `mongodb://localhost:27017/${DB_NAME}`;

// models
require("./games.model")
require("./user.model")
require("./review.model")

mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on("connected", () => console.log("Connected to database successfully"));
mongoose.connection.on("disconnected", () => console.log("Disconnected to database successfully"));
mongoose.connection.on("error", (err) => console.log("Failed to connect to database ", err));

// When application is interrupted
process.on('SIGINT', () => {
    mongoose.connection.close(() => console.log("Disconnected to database successfully"))
    process.exit(0)
})

// When application is terminated
process.on('SIGTERM', () => {
    mongoose.connection.close(() => console.log("Disconnected to database successfully"))
    process.exit(0)
})

process.once('SIGUSR2', () => {
    mongoose.connection.close(() => console.log("Disconnected to database successfully"))
    process.kill(process.pid, "SIGUSR2")
})