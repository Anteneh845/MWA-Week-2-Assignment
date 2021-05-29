const express = require("express");
const router = express.Router();
const {
    getReviewById,
    updateReview,
    getReviewList,
    deleteReviewById,
    createReview
} = require("../controllers/review.controller")

const {
    createGuitar,
    deleteGuitarById,
    getGuitarById,
    getGuitarList,
    updateGuitar,
} = require("../controllers/guitar.controller")

const {
    guitarIdUrlValidator,
    createGuitarValidator,
    updateGuitarValidator,
    getGuitarListValidator,
    reviewIdUrlValidator,
    createReviewValidator,
    updateReviewValidator
} = require("../validators/guitar.validator");

// Guitar routes
router
    .get("/guitars/", getGuitarListValidator, getGuitarList)
    .get("/guitars/:_id", guitarIdUrlValidator, getGuitarById)
    .delete("/guitars/:_id", guitarIdUrlValidator, deleteGuitarById)
    .patch("/guitars/:_id", updateGuitarValidator, updateGuitar)
    .put("/guitars/:_id", updateGuitarValidator, updateGuitar)
    .post("/guitars/", createGuitarValidator, createGuitar)


// Guitar reviews routes
router
    .get("/guitars/:guitarId/reviews/", guitarIdUrlValidator, getReviewList)
    .get("/guitars/:guitarId/reviews/:reviewId", reviewIdUrlValidator, getReviewById)
    .delete("/guitars/:guitarId/reviews/:reviewId", reviewIdUrlValidator, deleteReviewById)
    .put("/guitars/:guitarId/reviews/:reviewId", updateReviewValidator, updateReview)
    .post("/guitars/:guitarId/reviews", createReviewValidator, createReview)


module.exports = router;