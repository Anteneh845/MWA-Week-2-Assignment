const {model} = require("mongoose");
const User = model("User");
const {hashSync, compareSync, genSaltSync} = require("bcrypt-nodejs");
const {sign} = require("jsonwebtoken")

module.exports.getUserList = (req, res) => {
    let offset = parseInt(req.params.offset);
    let count = parseInt(req.params.count);
    User.find().skip(offset).limit(count).exec((err, userList) => {
        if (err)
            res.status(500).send({message: "Internal server error"});
        else
            res.status(200).send(userList);
    });
}

module.exports.createUser = (req, res) => {
    User.create({...req.body, password: hashSync(req.body.password, genSaltSync(10))})
        .then(response => res.status(201).send(response))
        .catch(err => res.status(500).send(err))
}

module.exports.authenticateUser = (req, res) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if (user) {
                if (compareSync(req.body.password, user.password)) {
                    const token = sign({user: user.email}, "SECRET", {expiresIn: 3600});
                    user = {
                        ...user._doc,
                        token: token
                    };
                    res.status(200).send(user);
                } else
                    res.status(401).send("Invalid Email/Password Combination")
            } else
                res.status(404).send("Invalid Email/Password Combination")
        })
        .catch(err => res.status(500).json(err))
}

module.exports.getUserById = (req, res) => {
    User.findById(req.params._id, (err, user) => {
        if (err)
            res.status(500).json({message: "Internal server error"});
        else if (!user)
            res.status(404).json({message: "User not found"})
        else
            res.status(200).json(user);
    })
}



module.exports.deleteUserById = (req, res) => {
    User.findByIdAndDelete(req.params._id, {useFindAndModify: true}, (err, user) => {
        if (err)
            res.status(500).json({message: "Internal server error"})
        else if (!user)
            res.status(404).json({message: "User not found"})
        else
            res.status(204).send();
    })
}

module.exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(req.params._id, {...req.body, updatedOn: Date.now()}, {new: true}, (err, user) => {
        if (err)
            res.status(500).json({message: "Internal server error"})
        else if (!user)
            res.status(404).send({message: "User not found"})
        else
            res.status(200).json(user);
    })
}

