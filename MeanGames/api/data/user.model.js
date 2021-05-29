const {model, Schema} = require("mongoose");

const userSchema = new Schema({
    name: {type: String},
    userName: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    createdOn: {type: String, default: Date.now()}
});

model("User", userSchema);