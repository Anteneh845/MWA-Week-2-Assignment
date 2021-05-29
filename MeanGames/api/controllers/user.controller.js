const {model} = require("mongoose");
const User = model("User");
const {hashSync, compareSync, genSaltSync} = require("bcrypt-nodejs");
const {} = require("bcrypt-nodejs");
const {sign, decode} = require("jsonwebtoken")

module.exports.authenticateUser = (req, res) => {
    User.findOne({userName: req.body.userName})
        .then(user => {
            if (user) {
                if (compareSync(req.body.password, user.password)) {
                    const token = sign({user: user.userName}, "SECRET", {expiresIn: 3600});
                    user = {
                        ...user._doc,
                        token: token
                    };
                    res.status(200).send(user);
                } else
                    res.status(401).send("Invalid UserName/Password Combination")
            } else
                res.status(404).send("Invalid UserName/Password Combination")
        })
        .catch(err => res.status(500).json(err))
}


module.exports.getUser = (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = decode(token)
    User.findOne({userName: decoded.user})
        .then(resp => res.status(200).send(resp))
        .catch(err => res.status(500).send(err));
}

module.exports.createUser = (req, res) => {
    User.create({...req.body, password: hashSync(req.body.password, genSaltSync(10))})
        .then(response => res.status(201).send(response))
        .catch(err => res.status(500).send(err))
}
