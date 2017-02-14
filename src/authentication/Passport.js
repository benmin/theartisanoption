var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/User');

module.exports = function(passport) {
    
    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    
    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        done(null, id);
    });
    
    passport.use(new LocalStrategy({
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    function(request, username, password, done) {
        
        console.log('authentication');
        
        console.log('username', username);
        
        // find a user whose username is the same as the forms username
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'username': username }, function(err, user) {
            if(err) return done(err);
            
            console.log(err);
            
            console.log('user = ', user);
            
            if(!user) {
                return done();
            }
            
            console.log(user.username, user.password);
            
            // if no user is found, return the message
            if(!user) {
                return done(null, false);//, request.flash('loginMessage', 'No user found.'));
            }
            
            if(!user.validPassword(password)) {
                return done(null, false);//, request.flash('loginMessage', 'Oops! Wrong password.'));
            }
            
            request.session.userId = user._id;
            
            console.log(user.username);
            console.log('user is valid');
            
            return done(null, user);
        });
    }));

};