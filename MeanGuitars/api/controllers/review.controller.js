const {model} = require("mongoose");
const Guitar = model("Guitar");

module.exports.createReview = (req, res) => {
    Guitar.findById(req.params.guitarId, (err, guitar) => {
        if (err)
            res.status(500).json({message: "Internal server error"});
        else if (!guitar)
            res.status(404).json({message: "Game not found"});
        else {
            const review = {
                review: req.body.review,
                reviewedBy: {
                    name: "Random User" // Change when authentication is integrated
                }
            };
            guitar.reviews.push(review);
            guitar.save((err, guitar) => {
                if (err)
                    res.status(500).json({message: "Internal server error"});
                else
                    res.status(201).json(guitar);
            })
        }
    })
}

module.exports.deleteReviewById = (req, res) => {
    Guitar.findById(req.params.guitarId, (err, guitar) => {
        if (err)
            res.status(500).json({message: "Internal server error"});
        else if (!guitar)
            res.status(404).json({message: "Guitar not found"});
        else {
            const reviewIndex = guitar.reviews.findIndex(r => r._id.toString() === req.params.reviewId);
            if (reviewIndex !== -1) {
                guitar.reviews.splice(reviewIndex, 1);
                guitar.save(err => {
                    if (err) res.status(500).json({message: "Interval server err "+err})
                })
                res.status(204).send();
            } else
                res.status(404).json({message: "review not found"})
        }
    });
}

module.exports.getReviewList = (req, res) => {
    Guitar.findById(req.params.guitarId, (err, guitar) => {
        if (err)
            res.status(500).json({message: `Internal server error`})
        else if (!guitar)
            res.status(404).json({message: `Guitar with ${req.params.guitarId} not found`})
        else
            res.status(200).json(guitar.reviews);
    })
}

module.exports.getReviewById = (req, res) => {
    Guitar.findById(req.params.guitarId, (err, guitar) => {
        if (err)
            res.status(500).json({message: `Internal server error`});
        else if (!guitar)
            res.status(404).json({message: `Guitar not founf`});
        else {
            const review = guitar.reviews.find(r => r._id.toString() === req.params.reviewId);
            if (review)
                res.status(200).json(review);
            else
                res.status(404).json({message: `Review not found`});
        }
    })
}

module.exports.updateReview = (req, res) => {
    Guitar.findByIdAndUpdate(req.params.guitarId, {...req.body, updatedOn: Date.now()}, {new: true}, (err, guitar) => {
        if (err)
            res.status(500).json({message: "Internal server error " + err});
        else if (!guitar)
            res.status(404).json({message: "Guitar not found"});
        else {
            const reviewIndex = guitar.reviews.findIndex(r => r._id.toString() === req.params.reviewId);
            if (reviewIndex !== -1) {
                guitar.reviews[reviewIndex].review = req.body.review;
                guitar.save(err => {
                    if (err) res.status(500).json({message: "Interval server"})
                })
                res.status(200).json(guitar.reviews[reviewIndex]);
            } else
                res.status(404).json({message: "review not found"})
        }
    });
}