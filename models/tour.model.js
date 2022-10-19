const mongoose = require('mongoose');
//schema design
const tourSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "tour name is required."],
        minLength: [3, "tour name must be 3 character."],
        maxLength: [100, "tour name not more than 100 character."],
        trim: true,
    },
    place: {
        type: String,
        required: [true, "tour place is required."],
        minLength: [3, "tour place must be 3 character."],
        maxLength: [100, "tour place not more than 100 character."],
        trim: true,
    },
    details: {
        type: String,
        required: [true, "tour details is required."],
        maxLength: [500, "tour details not more than 500 character."],
    },
    price: {
        type: Number,
        required: [true, "tour price is required."],
        min: [0, "invalid tour price."],
    },
    viewCount: {
        type: Number,
        required: true,
        min: 0,
    },
    image: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["available", "unavailable"],
            message: "status can't be {VALUE}"
        }
    }
}, {
    timestamps: true
})
// Mongoose Instance Methods
tourSchema.methods.logger = function () {
    return this.name
}
//create Model
const TourModel = mongoose.model('Tour', tourSchema);
module.exports = TourModel;