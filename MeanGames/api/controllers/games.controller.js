const {ObjectId} = require("mongodb")
const mongoose = require("mongoose");
const Game = mongoose.model("Game");


const runGeoQuery = function (req, res) {
    const lat = parseInt(req.query.lat);
    const long = parseInt(req.query.long);
    const query = {
        "publisher.location": {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: [long, lat]
                },
                $maxDistance: 1000,
                $minDistance: 0
            }
        }
    }
    Game.find(query).exec((err, games) => {
        if (err) {
            console.log(err);
            res.status(500).json({message: err})
        }
        res.status(200).json(games);
    })
}

module.exports.gamesGetAll = function (req, res) {
    console.log("JSON Request Received");
    let [offset, count] = [0, 5];
    if (req.query && req.query.offset && req.query.count) {
        offset = parseInt(req.query.offset);
        count = parseInt(req.query.count);

        if (count > 5)
            count = 5;
        if (isNaN(req.query.offset) || isNaN(req.query.count))
            res.status(400).send({message: "Invalid query parameter"})
        if (req.query && req.query.lat && req.query.long) {
            runGeoQuery(req, res);
            return;
        }
        Game.find().skip(offset).limit(count).exec((err, doc) => {
            if (err)
                console.log(err);
            res.status(200).json(doc.slice(offset, offset + count));
        });
    } else {
        if (req.query && req.query.lat && req.query.long) {
            runGeoQuery(req, res);
            return;
        }
        Game.find().skip(offset).limit(count).exec((err, doc) => {
            if (err)
                console.log(err);
            res.status(200).json(doc.slice(offset, offset + count));
        });
    }
}

module.exports.getGameById = function (req, res) {
    Game.findOne({_id: ObjectId(req.params.id)}, function (err, game) {
        if (err)
            res.status(500).json({message: "Internal Server Error"})
        else if (!game)
            res.status(404).json({message: "Game not found"})
        else
            res.status(200).send(game);
    })
}


module.exports.gamesAddOne = function (req, res) {
    console.log("POST new game")
    const response = {
        status: 200,
        message: ""
    }
    if (req.body && req.body.title && req.body.price && req.body.rate) {
        Game.create(req.body, function (err, game) {
            if (err) {
                console.log(err);
                response.status = 500;
                response.messsage = err;
            } else {
                response.statuse = 200;
                response.message = game.ops;
            }
            res.status(response.status).send(response.message);
        });
    } else
        res.status(400).send("Validation failed")
}


module.exports.updateGame = function (req, res) {
    if (req.params.id) {
        Game.findById(req.params.id, (err, game) => {
            if (err) {
                console.log(err)
                res.status(500).send({"message": "Internal Server Error"});
            } else {
                game.title = req.body.title;
                game.rate = req.body.rate;
                game.year = req.body.year;
                game.price = req.body.price;
                game.publisher = req.body.publisher;
                game.save((err, updatedGame) => {
                    if (err) {
                        console.log(err)
                        res.status(500).send({"message": "Internal Server Error"});
                    } else {
                        res.status(204).send(updatedGame);
                    }
                })
            }
        })
    }
}


module.exports.partialGameUpdate = function (req, res) {
    if (req.params.id) {
        Game.findById(req.params.id, (err, game) => {
            if (err) {
                console.log(err)
                res.status(500).send({"message": "Internal Server Error"});
            } else {
                if (req.body.title)
                    game.title = req.body.title;
                if (req.body.rate)
                    game.rate = req.body.rate;
                if (req.body.year)
                    game.year = req.body.year;
                if (req.body.price)
                    game.price = req.body.price;
                if (req.body.publisher)
                    game.publisher = req.body.publisher;
                Game.findByIdAndUpdate(req, params.id, req.body, (err, updatedGame) => {
                    if (err) {
                        console.log(err)
                        res.status(500).send({"message": "Internal Server Error"});
                    } else {
                        res.status(204).send(updatedGame);
                    }
                })
            }
        })
    }
}

module.exports.deleteOneGame = function (req, res) {
    if (req.params.id) {
        Game.findByIdAndDelete(req.params.id, (err, deletedGame) => {
            if (err) {
                console.log(err)
                res.status(500).send({"message": "Internal Server Error"});
            } else {
                res.status(204).send(deletedGame);
            }
        });
    } else
        res.send(404).send({message: "Game id not included in url"})
}