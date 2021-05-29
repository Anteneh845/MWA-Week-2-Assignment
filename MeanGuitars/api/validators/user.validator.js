module.exports.createUserValidator = (req, res, next) => {
    if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password)
        res.status(400).send("Please input all user attributes")
    else
        next();
}
module.exports.authenticateUserValidator = (req, resp, next) => {
    if (req.body && req.body.email && req.body.password)
        next();
    else
        resp.status(400).send("Include email and password combination")
}

module.exports.userUrlValidator = (req, res, next) => {
    if (!req.params._id)
        res.status(400).send("Please pass the user id in the URL")
    else
        next();
}

module.exports.updateUserValidator = (req, res, next) => {
    if (!req.params._id)
        res.status(400).send("Please pass the user id in the URL")
    else if (req.body.firstName || req.body.lastName || req.body.email || req.body.password)
        next();
    else
        res.status(400).send("Please input all user attributes that needs to be updated")
}

module.exports.getUserListValidator = (req, res, next) => {
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

