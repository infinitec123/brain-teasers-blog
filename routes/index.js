module.exports = function(app, models) {


//app.get('/', function (req, res) {
  //res.send('Welcome');
//});

app.get('/teasers/add', function (req, res) {
	//console.log("Received get request for to add a puzzle");
	res.render('add');
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
	console.log("Will call model method");
	models.Teaser.addTeaser(_title, _question, _solution, _category, _difficulty, _image_name, function(_teaser){
		console.log("Back to router");
		console.log(_teaser);
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
	//console.log('Title::' + _title);
	//console.log('Question::' + _question);
	//console.log('Solution::' + _solution);
	//console.log('Image Name::' + _image_name);
	//console.log('category::' + _category);
	//console.log('Difficulty::' + _difficulty);
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
	//res.send('Noticed');
});

app.get('/teasers/:id', function (req, res) {
	var _id = req.params.id;
	//console.log("Received get request for teaser with id:: " + _id);
  	models.Teaser.findById(_id, function(teaser){
  			console.log("Back to callback");
  			res.send(teaser);
  	});		
	//if (!(_category == "logical" || _category == "lateral" || _category == "mathematical" || _category == "programmatical")){
		//res.send(404);
	//} else{
		//console.log("Received get request for the type:: " + req.params.id);
  		//res.send(200);
	//}
});


app.delete('/teasers/:id', function (req, res) {
	var _id = req.params.id;
	//console.log("Received delete request for teaser with id:: " + _id);
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

