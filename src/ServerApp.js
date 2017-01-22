#!/bin/env node

var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var expressError = require('express-error');

/**
 *  Define the application.
 */
var ServerApp = function() {
    
    //  Scope.
    var me = this;


    /*  ================================================================  */
    /*  Helper functions.                                                 */
    /*  ================================================================  */

    /**
     *  Set up server IP address and port # using env variables/defaults.
     */
    me.setupVariables = function() {
        //  Set the environment variables we need.
        me.ipaddress = process.env.OPENSHIFT_NODEJS_IP;
        me.port = process.env.OPENSHIFT_NODEJS_PORT || 8080;

        if (typeof me.ipaddress === "undefined") {
            //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
            //  allows us to run/test the app locally.
            console.warn('No OPENSHIFT_NODEJS_IP var, using 127.0.0.1');
            me.ipaddress = "127.0.0.1";
        }
    };
    
    me.setupStatics = function() {
    	me.app.use('/', express.static(path.join(__dirname, '../bower_components')));
    	me.app.use('/', express.static(path.join(__dirname, '../my_components')));
    	me.app.use('/', express.static(path.join(__dirname, 'public')));
    };


//    /**
//     *  Populate the cache.
//     */
//    me.populateCache = function() {
//        if (typeof me.cache === "undefined") {
//            me.cache = { 'index.html': '' };
//        }
//
//        //  Local cache for static content.
//        me.cache['index.html'] = fs.readFileSync('./public/html/index.html');
//        me.cache['index.html'] = fs.readFileSync('./public/html/index.html');
//        
//    };


//    /**
//     *  Retrieve entry (content) from cache.
//     *  @param {string} key  Key identifying content to retrieve from cache.
//     */
//    me.cache_get = function(key) { return me.cache[key]; };


    /**
     *  terminator === the termination handler
     *  Terminate server on receipt of the specified signal.
     *  @param {string} sig  Signal to terminate on.
     */
    me.terminator = function(sig){
        if (typeof sig === "string") {
           console.log('%s: Received %s - terminating sample app ...',
                       Date(Date.now()), sig);
           process.exit(1);
        }
        console.log('%s: Node server stopped.', Date(Date.now()) );
    };


    /**
     *  Setup termination handlers (for exit and a list of signals).
     */
    me.setupTerminationHandlers = function(){
        //  Process on exit and signals.
        process.on('exit', function() { me.terminator(); });

        // Removed 'SIGPIPE' from the list - bugz 852598.
        ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
         'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
        ].forEach(function(element, index, array) {
            process.on(element, function() { me.terminator(element); });
        });
    };


    /*  ================================================================  */
    /*  App server functions (main app logic here).                       */
    /*  ================================================================  */
    
    /**

    /**
     *  Create the routing table entries + handlers for the application.
     */
    me.createRoutes = function() {
        me.routes = { };

//        me.routes['/asciimo'] = function(req, res) {
//            var link = "http://i.imgur.com/kmbjB.png";
//            res.send("<html><body><img src='" + link + "'></body></html>");
//        };

        me.routes['/'] = function(req, res) {
//            res.setHeader('Content-Type', 'text/html');
//            res.send(me.cache_get('index.html') );
        	res.sendFile(path.join(__dirname, 'public/index.html'));
        };
        
        me.routes['/api/testimonials'] = function(req, res) {
        	var testimonials = [{
    			quote: 'It\'s too bad the Catholic Church doesn\'t believe in cloning. Because then we could have an Aimee of our own!',
    			author: 'A Priest in West Virginia, after hearing Aim&eacute;e perform'
        	},{
        		quote: 'We already put money on another harpist, but we\'ll go ahead with you and lose our deposit. I really want you to play for my wedding!',
        		author: 'A pleased Bride'
        	}];
        	
        	console.log(testimonials);
        	res.send(testimonials);
        };
    };


    /**
     *  Initialize the server (express) and create the routes and register
     *  the handlers.
     */
    me.initializeServer = function() {
        
        var dbUrl = 'mongodb://localhost:27017/test';
        
        if(process.env.OPENSHIFT_MONGODB_DB_URL) {
            dbUrl = process.env.OPENSHIFT_MONGODB_DB_URL + process.env.OPENSHIFT_APP_NAME;
        }
        
        mongoose.connect(dbUrl, function(err) {
            if(err) throw err;
        });
        
        require('./authentication/Passport')(passport);
        
        me.createRoutes();
        me.app = express();
        
        me.app.use(bodyParser.json());
        me.app.use(bodyParser.urlencoded({ extended: false }));
        
        me.app.use(session({
            secret: 'thisssupersecretsecretsecretsuper',
            resave: false,
            saveUninitialized: true
        }));
        me.app.use(passport.initialize());
        me.app.use(passport.session());
        
        me.setupErrorHandlers(me.app);
        
        var router = express.Router();
        
//        app.use('/bower_components',  express.static(path.join(__dirname, '../bower_components')));
//        app.use('/js', express.static(path.join(__dirname, 'public/js')));
//        app.use('/css', express.static(path.join(__dirname, 'public/css')));
//        app.use('/html', express.static(path.join(__dirname, 'public/html')));
//        app.use('/query-field', express.static(path.join(__dirname, 'public/query-field')));
        
        router.get('/', function(request, response) {
	      	response.sendFile(path.join(__dirname, 'public/index.html'));
	    });
        
        router.get('/search', function(request, response) {
            response.sendFile(path.join(__dirname, 'public/results.html'));
        });
        
        router.get('/signup', function(request, response) {
            response.sendFile(path.join(__dirname, 'public/signup.html'));
        });
        
        router.get('/login', function(request, response) {
            response.sendFile(path.join(__dirname, 'public/login.html'));
        });
        
        router.get('/account', function(request, response) {
            response.sendFile(path.join(__dirname, 'public/account.html'));
        });

//        //  Add handlers for the app (from the routes).
//        for (var r in me.routes) {
////            router.get(r, me.routes[r]);
//        }
        
        me.app.use('/', router);
        
        // Setup static resources
        // This MUST be done after the me.app is created
        me.setupStatics();
    };


    /**
     *  Initializes the sample application.
     */
    me.initialize = function() {
        me.setupVariables();
//        me.populateCache();
        me.setupTerminationHandlers();

        // Create the express server and routes.
        me.initializeServer();
    };


    /**
     *  Start the server.
     */
    me.start = function() {
        //  Start the app on the specific interface (and port).
        me.app.listen(me.port, me.ipaddress, function() {
            console.log('%s: Node server started on %s:%d ...',
                        Date(Date.now() ), me.ipaddress, me.port);
        });
    };
    
    me.setupErrorHandlers = function(app) {
//    	// catch 404 and forward to error handler
//    	app.use(function(req, res, next) {
//    		var err = new Error('Not Found');
//    		err.status = 404;
//    		next(err);
//    	});

    	// error handlers

    	// development error handler
    	// will print stacktrace
    	if (app.get('env') === 'development') {
            app.use(expressError.express3({contextLinesCount: 3, handleUncaughtException: true}));
//    		app.use(function(err, req, res, next) {
//    			res.status(err.status || 500);
//    			console.log(err, err.status);
//                res.sendFile(path.join(__dirname, 'public/html/error.html'));
////    			res.render('error', {
////    				message: err.message,
////    				error: err
////    			});
//    		});
    	}

    	// production error handler
    	// no stacktraces leaked to user
    	app.use(function(err, req, res, next) {
            
            app.use(expressError.express3({contextLinesCount: 3, handleUncaughtException: true}));
//    		res.status(err.status || 500);
//    		console.log(err, err.status);
//            res.sendFile(path.join(__dirname, 'public/html/error.html'));
//    		res.render('error', {
//    			message: err.message,
//    			error: {}
//    		});
    	});
    };

};



/**
 *  main():  Main code.
 */
var app = new ServerApp();

app.initialize();
app.start();

