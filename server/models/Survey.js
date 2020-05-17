const mongoose = require('mongoose');

const { Schema } = mongoose; //destructured
const RecipientSchema = require('./Recipient');

//[String] means an array of Strings
//the _user Object created an ID (same as User?) and ref: links it to the Users collection
//the _ is a way to tell other devs that this is a reference to other Schema/collection
const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [RecipientSchema],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  dateSent: Date,
  lastResponded: Date
});

//This is how we create the actual class, users will be the name of the collection
//mongoose will not overwrite if the collection already exists, it will only
//create a new collection if the name you enter doesn't already exist
mongoose.model('surveys', surveySchema);
