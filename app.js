
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var fs          = require('fs');
var connect = require('connect');
var routes = require('./routes/index.js');
var app = express();

// all environments
//app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.limit('1mb'));
app.use(express.bodyParser());
app.use(express.cookieParser('somesuperspecialsecrethere')); 
app.use(express.methodOverride());
//app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


//Setup Models
var mongoose = require('mongoose');
var models = {
  Teaser: require('./models/Teaser')(app, mongoose)
};

var dbPath = process.env.MONGOLAB_URI || 'mongodb://localhost/TeaserBlog';

//var dbPath      = 'mongodb://localhost/TeaserBlog';
mongoose.connect(dbPath, function onMongooseError(err) {
    if (err) throw err;
});

//Invoke the server

var port = process.env.PORT || 6873;

app.listen(port, function() {
	console.log('Express server listening on port');
});

// Import the routes
fs.readdirSync('routes').forEach(function(file) {
  if ( file[0] == '.' ) return;
  var routeName = file.substr(0, file.indexOf('.'));
  require('./routes/' + routeName)(app, models, express);
});
