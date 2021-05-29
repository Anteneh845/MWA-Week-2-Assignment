module.exports.authenticateUserValidator = (req, resp, next) => {
    if (req.body && req.body.userName && req.body.password)
        next();
    else
        resp.status(400).send("Include username and password combination")
}

module.exports.registerUserValidator = (req, resp, next) => {
    if (req.body && req.body.name && req.body.userName && req.body.password)
        next();
    else
        resp.status(400).send("Include username and password combination")
}
