const {verify} = require("jsonwebtoken")

module.exports.authenticate = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
        verify(token, "SECRET", (err, decoded) => {
            if (err)
                console.log(err)
            else {
                next();
            }
        })
    } else {
        res.status(403).json({message: "Forbidden request"});
    }
}