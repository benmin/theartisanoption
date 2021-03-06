var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var BusinessSchema = require('./Business').schema;

var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    businesses: [BusinessSchema]
});

//userSchema.methods.generateHash = function(password) {
//    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
//};

userSchema.methods.validPassword = function(password) {
    
    console.log('validation password', password, this.password);
    
    return this.password === password;
//    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);