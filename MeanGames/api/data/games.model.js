const mongoose = require("mongoose");
// const reviewSchema = require("review.model");

const publisherSchema = new mongoose.Schema({
    name: String,
    location: {
        type: {type: String, default: "Point"},
        coordinates: {type: [Number], index: "2dsphere"}
    },
})

const gameSchema = new mongoose.Schema({
    title: {type: String, required: true},
    price: Number,
    year: Number,
    rate: {type: Number, min: 1, max: 5, default: 1},
    minPlayer: {type: Number, min: 1, max: 10},
    minPlayers: Number,
    minAge: Number,
    designers: String,
    publisher: publisherSchema
})

mongoose.model("Game", gameSchema, "games")
