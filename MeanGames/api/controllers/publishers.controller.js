const mongoose = require("mongoose");
const Game = mongoose.model("Game");

module.exports.getPublisherByGameId = function (req, res) {
    const gameId = req.params.gameId;
    Game.findById(gameId).select("publisher").exec((err, game) => {
        if (err)
            console.log(err);
        res.status(200).json(game.publisher);
    })
}

const addPublisher = (req, res, game) => {
    if (req.body && req.body.name && req.body.lng && req.body.lat) {
        game.publisher.name = req.body.name;
        game.publisher.location.type = "Point";
        game.publisher.location.coordinates = [parseFloat(req.body.lng), parseFloat(req.body.lat)]
        game.save((err, game) => {
            if (err) {
                console.log(err)
                res.status(500).send({message: err})
            } else {
                res.status(200).send(game);
            }
        })
    } else
        res.status(400).send({message: "Invalid request body parameters"})
}


module.exports.addPublisher = function (req, res) {
    console.log("Add one publisher to a game");
    const response = {
        status: 200,
        message: ""
    }
    if (req.param && req.params.gameId) {
        Game.findById(req.params.gameId).exec((err, game) => {
            if (err) {
                response.status = 500;
                response.message = "Internal server error";
                res.status(response.status).send({message: response.message})
            } else if (!game) {
                response.status = 500;
                response.message = "Internal server error";
                res.status(response.status).send({message: response.message})
            } else {
                game.publisher = {};
                addPublisher(req, res, game)
            }
        })
    } else {
        response.status = 400;
        response.message = "Invalid request parameter";
        res.status(response.status).send({message: response.message})
    }
}