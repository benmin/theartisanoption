var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var businessSchema = new Schema({
    name: { type: String, required: true },
    address: {
        streetAddress: { type: String, required: false },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipcode: { type: String, required: true }
    },
    website: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: Number, required: false },
    shortDescription: { type: String, required: true },
    longDescription: { type: String, required: true },
    reviews: [{
        rating: { type: Number, required: true },
        reviewerName: { type: String, required: true },
        title: { type: String, required: false },
        content: { type: String, required: false }
    }]
});

module.exports = mongoose.model('Business', businessSchema);