const mongoose = require('mongoose');

const { Schema } = mongoose; //destructured

//[String] means an array of Strings
const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [String]
});

//This is how we create the actual class, users will be the name of the collection
//mongoose will not overwrite if the collection already exists, it will only
//create a new collection if the name you enter doesn't already exist
mongoose.model('survey', surveySchema);
