const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    title: {type: String, required: true},
    rating: {type: Number, min: 0, max: 5, required: true},
    review: {type: String, required: true},
    createdDate: {type: Date, default: Date.now()},
});
mongoose.model("Review", reviewSchema);
module.exports = reviewSchema;