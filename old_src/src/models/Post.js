var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var postSchema = new Schema({
    date: { type: Date, required: true },
    message: { type: String, required: true }
});

module.exports = mongoose.model('Post', postSchema);