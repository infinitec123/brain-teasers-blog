
/**
 * Module dependencies.
 */
require('newrelic');
var express = require('express');
var http = require('http');
var path = require('path');
var fs          = require('fs');
var connect = require('connect');
var routes = require('./routes/index.js');
var app = express();

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

// all environments
//app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.limit('1mb'));

app.use(express.cookieParser()); 
app.use(express.bodyParser());
app.use(express.session({secret:'letschangetheworldforbettersecret'}));
app.use(passport.initialize());
app.use(passport.session());


app.use(express.methodOverride());
//app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

var env = process.env.NODE_ENV || 'development',
    config = require('./config/config')[env];

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var isAuthenticated = function(req, res, next){
	if(req.isAuthenticated()){
		next();
	} else {
		res.redirect('/contact'); //to be changed to /contact
	}
};

//Setup Models
var mongoose = require('mongoose');
var models = {
  Teaser: require('./models/Teaser')(app, mongoose),
  User: require('./models/user')
};

var dbPath = process.env.MONGOLAB_URI || 'mongodb://localhost/TeaserBlog';

//var dbPath      = 'mongodb://localhost/TeaserBlog';
mongoose.connect(dbPath, function onMongooseError(err) {
    if (err) throw err;
});
require('./lib/passport')(passport, config)
//Invoke the server

var port = process.env.PORT || 8080;

app.listen(port, function() {
	console.log('Express server listening on port:' + port);
});

// Import the routes
fs.readdirSync('routes').forEach(function(file) {
  if ( file[0] == '.' ) return;
  var routeName = file.substr(0, file.indexOf('.'));
  require('./routes/' + routeName)(app, models, passport);
});
