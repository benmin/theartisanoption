var express = require('express');
var Post = require('../models/Post');
//var graph = require('fbgraph');

var router = express.Router();

//var appAccessToken = '969900873118466|GSHdCz3kPssgBpVN_FhdqqDvlE4',
//	appSecret = 'b8b479cf81e77795bdcfbd7eef545bad';
//
//graph.setAccessToken(appAccessToken);
//graph.setAppSecret(appSecret);

/**
 * Routes for /api/newsfeed
 */

router.get('/posts', function(request, response, next) {
    
    Post.find({}, function(err, posts) {
        if(err) throw err;
        
        posts.sort(function(p1, p2) {
            if(p1.date > p2.date) {
                return -1;
            }
            
            if(p1.date < p2.date) {
                return 1;
            }
            
            return 0;
        });
        
        response.json(posts);
    });
	
//	graph.get('/localmakerconnect/posts', { limit: 10 }, function(error, fbResponse) {
//		if(error) console.log(error);
//		
//		response.json(fbResponse);
//	});
	
});

module.exports = router;