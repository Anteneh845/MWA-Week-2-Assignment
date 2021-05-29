const express = require("express");
const path = require("path");
const router = express.Router();
const {
    gamesGetAll,
    getGameById,
    updateGame,
    gamesAddOne,
    deleteOneGame,
    partialGameUpdate
} = require("../controllers/games.controller");
const {getPublisherByGameId, addPublisher} = require("../controllers/publishers.controller");

router.get("/games", gamesGetAll)
    .post("/games", gamesAddOne)

router.route("/games/:id")
    .get(getGameById)
    .put(updateGame)
    .patch(partialGameUpdate)
    .delete(deleteOneGame);


router.route("/file").get((req, res) => {
    res.status(200).sendFile(path.join(__dirname, "..", "app-9.js"))
});

router.route("/games/:gameId/publishers")
    .get(getPublisherByGameId)
    .post(addPublisher);

module.exports = router;