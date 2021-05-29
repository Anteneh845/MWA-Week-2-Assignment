const {model} = require("mongoose");
const Guitar = model("Guitar");

module.exports.getGuitarList = (req, res) => {
    let [offset, count] = [0, 5];
    if (req.query.offset)
        offset = parseInt(req.query.offset);

    if (req.query.count) {
        count = parseInt(req.query.count);
        count = count > 5 ? 5 : count;
    }
    let searchQuery = req.query.brand ? {brand: req.query.brand}:{}
        Guitar.find(searchQuery).skip(offset).limit(count).exec((err, guitars) => {
            if (err)
                res.status(500).json({message: "Internal server error"});
            else
                res.status(200).json(guitars);
        })
}

module.exports.getGuitarById = (req, res) => {
    Guitar.findById(req.params._id).exec((err, guitar) => {
        if (err)
            res.status(500).send({message: "Internal server error"})
        else if (!guitar)
            res.status(404).send({message: "Guitar not found"})
        else
            res.status(200).send(guitar);
    })
}

module.exports.createGuitar = (req, res) => {
    Guitar.create(req.body, (err, guitar) => {
        if (err)
            res.status(500).json({message: "Internal server error " + err});
        else
            res.status(201).send(guitar);
    })
}

module.exports.deleteGuitarById = (req, res) => {
    Guitar.findByIdAndDelete(req.params._id).exec((err, guitar) => {
        if (err)
            res.status(500).send({message: "Internal server error"})
        else if (!guitar)
            res.status(404).send({message: "Guitar not found"})
        else
            res.status(204).send();
    })
}

module.exports.updateGuitar = (req, res) => {
    Guitar.findByIdAndUpdate(req.params._id, {...req.body, updatedOn: Date.now()}, {new: true}).exec((err, guitar) => {
        if (err)
            res.status(500).send({message: "Internal server error"})
        else if (!guitar)
            res.status(404).json({message: "Guitar not found"})
        else
            res.status(200).send(guitar);
    })
}


