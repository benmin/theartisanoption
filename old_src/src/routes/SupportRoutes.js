var express = require('express');
var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');

var router = express.Router();

var auth = {
	auth: {
		api_key: 'key-0afafef91f7cf90f76f4c3dd67128ea1',
		domain: 'theartisanoption.com'
	}
};

var buildBody = function(userInfo, linebreak) {
    var str = 'A new supporter has submitted their email address!';
    str += linebreak + linebreak + 'Name: ' + userInfo.name;
    str += linebreak + 'Email: ' + userInfo.email;
    
    if(userInfo.isArtisan) {
        str += linebreak + 'Is an artisan: yes';
        str += linebreak + 'Product/craft: ' + userInfo.product;
        str += linebreak + 'Zipcode: ' + userInfo.location;
        str += linebreak + 'Website URL: ' + userInfo.website;
    } else {
         str += linebreak + 'Is an artisan: no';
    }
    
//    return encodeURIComponent(str);
    return str;
};

var buildReplyBody = function(linebreak) {
    var str = 'Thank you for your interest in The Artisan Option!'
    str += linebreak + linebreak + 'We will keep you up-to-date as work progresses, and let you know how you can get involved.';
    
    return str;
};

/**
 * Routes for /api/quote
 */

/* POST request data, and email it. */
router.post('/', function(request, response, next) {
	
	console.log(request.body);
	
	var nodemailerMailgun = nodemailer.createTransport(mg(auth));

	var userInfo = request.body;
    
	nodemailerMailgun.sendMail({
		from: '"Supporter Form" <webmaster@theartisanoption.com>',
		to: 'jonathan@theartisanoption.com', // An array if you have multiple recipients.
//		cc:'second@domain.com',
//		bcc:'secretagent@company.gov',
		subject: 'New Supporter',
//		'h:Reply-To': 'reply2this@company.com',
		text: buildBody(userInfo, '\n'),
        html: buildBody(userInfo, '<br />')
	}, function (error, info) {
		if(error){
	        console.log(error);
	        response.status(400).send(error);
	    } else {
            nodemailerMailgun.sendMail({
                from: '"TheArtisanOption" <jonathan@theartisanoption.com>',
                to: userInfo.email,
                subject: 'Thank you for your interest!',
                text: buildReplyBody('\n'),
                html: buildReplyBody('<br />')
            });
	    	console.log('Message sent: ' + JSON.stringify(info));
		    response.send('Email submitted.');
	    }
	});
    
});

module.exports = router;