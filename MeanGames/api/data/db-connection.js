const {MongoClient} = require("mongodb");
const DB_NAME = "meanGames";
const DB_URL = "mongodb://localhost:27017/" + DB_NAME;

let connection = null;
const open = function () {
    MongoClient.connect(DB_URL, {useUnifiedTopology: true}, function (err, client) {
        if (err)
            console.log(err);
        connection = client.db(DB_NAME);
        console.log("Connection to Database successful")
    });
}
const get = function () {
    return connection;
}

module.exports = {
    open: open,
    get: get
}