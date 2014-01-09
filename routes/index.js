module.exports = function(app, models, express) {


app.get('/teasers/add', function (req, res) {
	//console.log("Received get request for to add a puzzle");
	res.render('add');
});

app.get('/admin', function(req, res){
 res.render('login');
});

app.post('/admin', function(req, response){
 var email = req.body.email;
 var password = req.body.password;
 console.log('Request received tPo login received with email: ' + email + ' Password: ' + password);
 
 if(email == "raosharat@gmail.com" && password =="Tenacity456!"){
  console.log("Welcome Pandeshwar. You are authorized.");
  //response.cookie('name', 'Pandeshwar', { signed: true });
  response.sendfile('views/index_master.html');
 } else 		response.send(401);
});

app.post('/teasers', function (req, res) {
	console.log("Received post request for to add a puzzle");
	
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

app.put('/teasers/:id', function (req, res) {
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
	models.Teaser.updateTeaser(_id, _title, _question, _solution, _category, _difficulty, _image_name);
	res.send('Teaser Updated');
});


app.get('/teasers', function (req, res) {
  	//console.log("Received get request for all:: ");
  	models.Teaser.findAll(function(teasers){
  			//console.log("Back to callback");
  			res.send(teasers);
  	});	
});

app.get('/teasers/:id', function (req, res) {
	var _id = req.params.id;
	//console.log("Received get request for teaser with id:: " + _id);
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



app.delete('/teasers/:id', function (req, res) {
	var _id = req.params.id;
	console.log("Received delete request for teaser with id:: " + _id);
	if ( null == _id ) {
      res.send(400);
      return;
    }
  	models.Teaser.deleteById(_id, function(result){
  		//console.log("Res::" + result);
  		res.send(result);
  	});
  	//res.send('Deleted');		
});



}    

