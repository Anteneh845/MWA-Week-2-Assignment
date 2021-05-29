const {connect, connection} = require("mongoose");
const DB_NAME = "GuitarCollection";
const DB_URL = "mongodb://localhost:27017/" + DB_NAME;

require("../schemas/guitar.schema")
require("../schemas/user.schema")

connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true}, (err) => {
    if (err)
        console.log(err);
    console.log("Connected to database successfully")
})

process.on('SIGINT', () => {
    connection.close(() => console.log("Disconnected to database successfully"))
    process.exit(0)
})

process.on('SIGTERM', () => {
    connection.close(() => console.log("Disconnected to database successfully"))
    process.exit(0)
})


process.once('SIGUSR2', () => {
    connection.close(() => console.log("Disconnected to database successfully"))
    process.kill(process.pid, "SIGUSR2")
})
