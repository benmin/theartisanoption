var express = require('express');
var path = require('path');
var Business = require('../models/Business');

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

router.get('/', isAuthenticated, function(request, response, next) {
    response.sendFile(path.join(__dirname, '../public/editor.html'));
});

//router.post('/')

router.post('/post', isAuthenticated, function(request, response, next) {
    var postData = request.body;
    
    console.log('UPDATING/CREATING POST');
    
//    if(!postData.date) {
//        postData.date = new Date();
//    }
    postData.message = postData.message.replace(/(?:\r\n|\r|\n)/g, '\u003cbr /\u003e');
    
    if(postData._id) {
        var id = postData._id;
//        post = new Post(postData);
//        delete post._id;
        console.log('updating', postData.message);
        
        delete postData._id;

        Post.update({_id: id}, postData, function(err, raw) {
            if(err) return console.error(err);

            console.log(raw);
            response.json({success: true});
        });
    } else {
        postData.date = new Date();

        Post.create(postData, function(err, post) {
            if(err) return console.error(err);
            response.json({success: true});
        });
    }
    
});

router.delete('/post/:postId', isAuthenticated, function(request, response, next) {
    
    console.log('DELETING POST')
    
    Post.remove({_id: request.params.postId}, function(err) {
        if(err) throw err;

        response.send();
    });
});

module.exports = router;