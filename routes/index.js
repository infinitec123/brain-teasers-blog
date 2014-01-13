module.exports = function(app, models, passport) {

var Auth = require('../lib/authorization');

var isAuthenticated = function(req, res, next){
	if(req.isAuthenticated()){
		next();
	} else {
		//res.redirect('/admin'); //to be changed to /contact
		res.send(401);
	}
};

app.get('/api/teasers/add', function (req, res) {
	//console.log("Received get request for to add a puzzle");
	res.render('add');
});

app.get('/admin', function(req, res){
 console.log("Received get to admin form");
 res.render('login');
});

app.get('/auth/facebook', passport.authenticate("facebook", {scope:"email"}));

app.get("/auth/facebook/callback", 
    passport.authenticate("facebook",{ failureRedirect: '/admin'}),
    function(req,res){

    	if(req.user.facebook.email == 'raosharat@gmail.com'){
    		res.sendfile('public/index.html');
    	} else {
    		res.send(401);
    	}
    }
  );

app.post('/api/teasers', isAuthenticated, function (req, res) {

	var _title = req.body.title;
	var _question = req.body.question;
	var _solution=req.body.solution;
	var _category = req.body.category;
	var _difficulty = req.body.difficulty;
	var _image_name = req.body.image_name;

	if(_title == "" || _question.length < 5 || _solution.length < 5){ 
		res.send(400);
     	return;
	}
	//console.log("Will call model method");
	models.Teaser.addTeaser(_title, _question, _solution, _category, _difficulty, _image_name, function(_teaser){
		res.send(_teaser);
	});
	
});

app.put('/api/teasers/:id', isAuthenticated, function (req, res) {
	console.log("Received update request for to modify a puzzle");
	
	var _id = req.params.id;
	var _title = req.body.title;
	var _question = req.body.question;
	var _solution=req.body.solution;
	var _category = req.body.category;
	var _difficulty = req.body.difficulty;
	var _image_name = req.body.image_name;

	if(_title == "" || _question.length < 5 || _solution.length < 5){ 
		res.send(400);
     	return;
	} 
	models.Teaser.updateTeaser(_id, _title, _question, _solution, _category, _difficulty, _image_name, function(_teaser){
		res.send(_teaser);
	});
	
});


app.get('/api/teasers', function (req, res) {
  	//console.log("Received get request for all:: ");
  	
  	if(req.isAuthenticated()){
		console.log('Authenticaled user***********');
	} else {
		console.log('Not Authenticaled user***********')
	}

  	models.Teaser.findAll(function(teasers){
  			res.send(teasers);
  	});	
});

app.get('/api/teasers/:id', function (req, res) {
	var _id = req.params.id;
  	models.Teaser.findById(_id, function(teaser){
  	  res.send(teaser);
  	});		
});

app.get('/puzzles/:category', function (req, res) {
	var _category = req.params.category;
  	models.Teaser.findByCategory(_category, function(teasers){
		res.send(teasers);
  	});		
});



app.delete('/api/teasers/:id', isAuthenticated, function (req, res) {
	var _id = req.params.id;
	console.log("Received delete request for teaser with id:: " + _id);
	if ( null == _id ) {
      res.send(400);
      return;
    }
  	models.Teaser.deleteById(_id, function(result){
  		res.send(result);
  	});		
});

app
  // Point all requests at one file
  .get('*', function (req, res) {
    res.sendfile('public/index.html');
  });

}    

