var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true }
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