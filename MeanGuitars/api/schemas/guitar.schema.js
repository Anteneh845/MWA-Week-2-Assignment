const {model, Schema} = require("mongoose");

const reviewSchema = new Schema({
    review: {type: String, required: true},
    rating: {type: Number, min: 1, max: 0, required: true},
    reviewedBy: {
        // userId: {type: ObjectId, required: true},
        name: {type: String, required: true}
    },
    createdOn: {type: Date, default: Date.now()},
    updatedOn: {type: Date, default: Date.now()},
})

const guitarSchema = new Schema({
    type: {type: String, required: true, enum: ["Electric", "Acoustic", "Classical"]},
    description:{type:String,required:true},
    brand: {type: String, required: true},
    year: {type: Number, required: true},
    link: {type: String, required: true},
    stringType: {type: String, enum: ["Steel", "Nylon"], default: "Steel"},
    reviews: [reviewSchema],
    // createdBy: {type: ObjectId, ref: "User", required: true},
    createdOn: {type: Date, default: Date.now()},
    updatedOn: {type: Date, default: Date.now()},
});

model("Guitar", guitarSchema);