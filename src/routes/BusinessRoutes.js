var express = require('express');
var path = require('path');
var User = require('../models/User');
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

/*
/ Retrieve the business page.
*/
router.get('/', isAuthenticated, function(request, response, next) {
    response.sendFile(path.join(__dirname, '../public/editor.html'));
});

/*
/ Create a new business.
*/
router.post('/', isAuthenticated, function(request, response, next) {
    var businessData = request.body;
    
    console.log('creating business');
    console.log('businessData = ', businessData);
    
    // find all businesses for the logged in user
    User.findById(request.session.userId, function(err, user) {
        if(err) return err;
        
        console.log('found user = ', user);
        
        if(user !== null) {
            var isDuplicate = false,
                i;
            
            for(i = 0; i < user.businesses.length; i++) {
                if(user.businesses[i].name === businessData.name) {
                    isDuplicate = true;
                    console.log('this user already has a business with that name!');
                    response.json({ success: false, msg: 'A business with that name already exists. Please choose a different name.' });
                }
            }
            
            console.log('isDuplicate', isDuplicate);
            
            if(!isDuplicate) {
                console.log('creating...');
                
                if(!businessData.longDescription) {
                    businessData.longDescription = businessData.shortDescription;
                }
                
                // create new business
                Business.create(businessData, function(err, business) {
                    if(err) return console.log(err);
                    
                    console.log('created!');
                    
                    user.businesses.push(business);
                    
                    console.log(user, business);
                    user.save(function(err, updatedUser) {
                        if(err) return console.log(err);
                        console.log('added to user!', updatedUser);
                        response.redirect('/account');
                    });
                });
            }
        } else {
            console.log('no valid user!!! :O');
        }
    });
});

/*
/ Retrieve business by ID.
*/
router.get('/:id', isAuthenticated, function(req, res, next) {
    // find all businesses for the logged in user
    User.findById(req.session.userId, function(err, user) {
        if(err) return err;
        
        console.log('found user = ', user);
        
        if(user !== null) {
            var i;
            
            for(i = 0; i < user.businesses.length; i++) {
                console.log(user.businesses[i]._id, req.params.id);
                if(user.businesses[i]._id == req.params.id) {
                    res.json(user.businesses[i]);
                }
            }
        } else {
            console.log('no valid user!!! :O');
        }
    });
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