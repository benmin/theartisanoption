var express = require('express');
var passport = require('passport');
var path = require('path');

var router = express.Router();

router.post('/authenticate', passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/login',
    failureFlash: true,
    session: true
}));

router.get('/', function(request, response, next) {
    response.sendFile(path.join(__dirname, '../public/html/login.html'));
});

module.exports = router;