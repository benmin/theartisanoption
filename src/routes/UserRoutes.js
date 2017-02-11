var express = require('express');
var passport = require('passport');
var path = require('path');
var User = require('../models/User');

var router = express.Router();

function isAuthenticated(request, response, next) {
    console.log('isAuthenticated()');
    console.log(request.isAuthenticated());
    if(request.isAuthenticated()) {
        next();
    } else {
        response.redirect('/account/login');
    }
};

// GET  /account                 user account manager (requires login)
        // POST /account/signup              create new user
        // GET  /account/<user_id>      get user info by id (requires login)
        // POST /account/<user_id>      update user info (requires login)

router.get('/', isAuthenticated, function(request, response, next) {
    response.sendFile(path.join(__dirname, 'public/html/account.html'))
});

router.post('/', isAuthenticated, function(request, response, next) {
    // update user info
});

router.get('/signup', function(request, response, next) {
    response.sendFile(path.join(__dirname, 'public/signup.html'));
});

router.post('/signup', function(request, response, next) {
    var userData = request.body;
    
    console.log('signing up');
    console.log('userData = ', userData);
    
    // check if username or email exists
    User.findOne({ $or: [{ 'username': userData.username }, { 'email': userData.email }] }, function(err, user) {
        if(err) return console.error(err);
        
        console.log('found something = ', user);
        
        if(user !== null) {
            console.log('user already exists');
            response.json({success: false, msg: 'A user with that username or email already exists.'});
        } else {
            console.log('creating user');
            User.create(userData, function(err, user) {
                if(err) return console.error(err);
                
                response.redirect('/account');
                
                response.json({success: true});
            });
        }
    });
});

router.get('/login', function(request, response, next) {
    response.sendFile(path.join(__dirname, 'public/login.html'));
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/account',
    failureRedirect: '/account/login',
    failureFlash: true,
    session: true
}));

module.exports = router;