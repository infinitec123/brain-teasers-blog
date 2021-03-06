module.exports = function(app, mongoose) {

var DIFFICULTY_LEVELS = ['Easy', 'Medium', 'Difficult', 'Tough'];
var TEASER_TYPE = ['Logical', 'Lateral', 'Mathematical', 'Programmatical'];

var TeaserSchema = new mongoose.Schema({
        title: {type: String, required: true, unique: true, trim: true, index: true},
        question: {type: String, required: true},
        solution: {type: String, required: true},
        //image_url: {type: String, match: //},
        image_name: {type: String, default: 'how.jpg'},
        difficulty: { type: String, enum: DIFFICULTY_LEVELS },    
        category: { type: String, enum: TEASER_TYPE } 
});
TeaserSchema.index({category: 1});


//Models
var Teaser = mongoose.model('Teaser', TeaserSchema );

  var registerCallback = function(err) {
    if (err) {
      return console.log(err);
    };
    return console.log('Teaser was created');
  };
  
  var findById = function(teaserId, callback) {
      console.log("Got request in model with id:::" + teaserId);
      Teaser.findById(teaserId, function(err, teaser){
        if(!err){
          console.log("Retrieved the book succssfully");
          callback(teaser);
        } else {
          callback("Failed");
        }
      });
  };

  var findByCategory = function(_category, callback){
    Teaser.find({category : _category}).sort({title: 1}).exec(function(err,teasers){
      if(!err){
          callback(teasers);
      } else {
          callback("Failed");
      }
    });
  };

  var findAll = function(callback) {
    Teaser.find({}).sort({title: 1}).exec(function(err,teasers){
      if(!err){
          callback(teasers);
      } else {
          callback("Failed");
      }
    });
  };

  var addTeaser = function(_title, _question, _solution, _category, _difficulty, _image_name, callback) {

    var _teaser = new Teaser({
      title: _title,
      question: _question,
      solution: _solution,
      image_name: _image_name,
      difficulty: _difficulty,
      category: _category
    });

    _teaser.save(function( err ) {
                if( !err ) {
                        console.log( 'created' );
                        callback(_teaser);

                } else {
                        callback(false);
                        return console.log( err );

                }
        });
    console.log('Save command was sent');
  };

  var updateTeaser = function(teaserId, _title, _question, _solution, _category, _difficulty, _image_name, callback) {
    console.log('Inside Teaser for update');
    var conditions = { _id: teaserId };
    var update = { 
      title: _title,
      question: _question,
      solution: _solution,
      image_name: _image_name,
      difficulty: _difficulty,
      category: _category
    }; 
    var options = { multi: false };

    //function callback (err, numAffected) {
      //if(!err){ console.log("Modified " + numAffected + " documents"); }
      //else { console.log("Failed to modify"); console.log(err);}
    //};

    Teaser.update(conditions, update, options, function(err, numAffected){
      if(!err){

      var updated_doc = { 
        title: _title,
        _id: teaserId,
        question: _question,
        solution: _solution,
        image_name: _image_name,
        difficulty: _difficulty,
        category: _category
      };
        callback(updated_doc);
      } else {
        callback('Failed');
      }
    });
  };

  var deleteById = function(teaserId, callback) {
    Teaser.remove({ _id: teaserId }, function(err) {
        if (!err) { 
          console.log("succssfully deleted"); 
          callback(true);
        }
        else { 
          console.log("failed to delete"); 
          callback(false);
        }
    });
  };

  return {
    findById: findById,
    findAll: findAll,
    findByCategory: findByCategory,
    addTeaser:addTeaser,
    updateTeaser:updateTeaser,
    deleteById: deleteById
  }
}
