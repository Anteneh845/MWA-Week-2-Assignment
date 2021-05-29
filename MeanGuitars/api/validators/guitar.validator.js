module.exports.createGuitarValidator = (req, res, next) => {
    if (!req.body.type && !req.body.link && !req.body.stringType && !req.body.year && !req.body.brand && !req.body.description)
        res.status(400).send("Please input all guitar attributes")
    else if (isNaN(req.body.year))
        res.status(400).send("Year must be of type number")
    else
        next();
}

module.exports.updateGuitarValidator = (req, res, next) => {
    if (!req.params._id)
        res.status(400).send("Please pass the guitar ID in the URL")
    else if (req.body.type || req.body.link || req.body.stringType || req.body.year || req.body.year || req.body.description)
        next();
    else
        res.status(400).send("Please input all guitar attributes that needs to be updated")
}

module.exports.getGuitarListValidator = (req, res, next) => {
    if (!req.query.offset && !req.query.count) {
        next();
    } else if (req.query.offset) {
        let offset = parseInt(req.query.offset);
        if (isNaN(offset))
            res.status(400).json({message: "Offset query parameter needs to be a number"})
    } else if (req.query.count) {
        let count = parseInt(req.query.count);
        if (isNaN(count))
            res.status(400).json({message: "Count query parameter needs to be a number"})
    }
}

module.exports.guitarIdUrlValidator = (req, res, next) => {
    if (!req.params.guitarId)
        res.status(400).json("Please pass the guitar id in the URL")
    else
        next();
}


module.exports.reviewIdUrlValidator = (req, res, next) => {
    if (!req.params.guitarId && !req.params.reviewId)
        res.status(400).json({message: "Please pass the guitar id and review id in the URL"});
    else
        next();
}

module.exports.createReviewValidator = (req, res, next) => {
    if (!req.params.guitarId)
        res.status(400).json({message: "Please pass the guitar ID in the URL"});
    else if (!req.body.review && !req.body.rating)
        res.status(400).json({message: "review and rating is required"});
    else
        next();
}


module.exports.updateReviewValidator = (req, res, next) => {
    if (!req.params.guitarId)
        res.status(400).json({message: "Please pass the guitar ID in the URL"})
    else if (!req.params.guitarId)
        res.status(400).json({message: "Please pass the review Id in the URL"})
    else if (!req.body.review && !req.body.rating)
        res.status(400).json({message: "review is required"})
    else
        next();
}
module.exports.updateGuitarValidator = (req, res, next) => {
    if (!req.params._id)
        res.status(400).send("Please pass the guitar ID in the URL")
    else if (req.body.type || req.body.link || req.body.stringType || req.body.year || req.body.year) {
        if (req.body.year && isNaN(req.body.year))
            res.status(400).send("Year must be of type number")
        else
            next();
    } else
        res.status(400).send("Please input all guitar attributes that needs to be updated")
}

module.exports.getGuitarListValidator = (req, res, next) => {
    if (!req.query.offset && !req.query.count) {
        next();
    } else if (req.query.offset) {
        let offset = parseInt(req.query.offset);
        if (isNaN(offset))
            res.status(400).json({message: "Offset query parameter needs to be a number"})
    } else if (req.query.count) {
        let count = parseInt(req.query.count);
        if (isNaN(count))
            res.status(400).json({message: "Count query parameter needs to be a number"})
    }
}

module.exports.guitarIdUrlValidator = (req, res, next) => {
    if (!req.params._id)
        res.status(400).json("Please pass the guitar id in the URL")
    else
        next();
}


module.exports.reviewIdUrlValidator = (req, res, next) => {
    if (!req.params.guitarId && !req.params.reviewId)
        res.status(400).json({message: "Please pass the guitar id and review id in the URL"});
    else
        next();
}

module.exports.createReviewValidator = (req, res, next) => {
    if (!req.params.guitarId)
        res.status(400).json({message: "Please pass the guitar ID in the URL"});
    else if (!req.body.review && !req.body.rating)
        res.status(400).json({message: "review and rating is required"});
    else
        next();
}


module.exports.updateReviewValidator = (req, res, next) => {
    if (!req.params.guitarId)
        res.status(400).json({message: "Please pass the guitar ID in the URL"})
    else if (!req.params.guitarId)
        res.status(400).json({message: "Please pass the review Id in the URL"})
    else if (!req.body.review && !req.body.rating)
        res.status(400).json({message: "review is required"})
    else
        next();
}